const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const PORT = process.env.port || 8008;
const cors = require('cors');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

let corsOptions = {
  origin: '*',
  credential: true,
};

app.use(cors(corsOptions));

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: '5teams',
});

// 회원가입 요청
app.post('/register/commit', (req, res) => {
  const { email, name, nickname, birthday } = req.body;
  const password = req.body.password1;

  const sqlQuery1 = 'SELECT COUNT(*) FROM users WHERE email = ?;';
  const sqlQuery2 = 'INSERT INTO users VALUES(?, ?, ?, ?, ?);';

  db.query(sqlQuery1, [email], (err, result) => {
    if (result[0]['COUNT(*)'] === 1) {
      res.send('0'); // 이미 존재하는 email
    } else {
      db.query(
        sqlQuery2,
        [email, password, name, nickname, birthday],
        (err, result) => {
          res.send('1'); // 회원가입 성공
        }
      );
    }
  });
});

// 로그인 요청
app.post('/login/commit', (req, res) => {
  const { email, password } = req.body;

  const sqlQuery1 =
    'SELECT COUNT(*) FROM users WHERE email = ? AND password = ?;';
  const sqlQuery2 = 'SELECT * FROM users WHERE email=? AND password=?;';

  db.query(sqlQuery1, [email, password], (err, result) => {
    if (result[0]['COUNT(*)'] === 1) {
      db.query(sqlQuery2, [email, password], (err, result) => {
        res.send(result); // 로그인 성공 및 유저 데이터 리턴
      });
    } else {
      res.send('0'); // 존재하지 않는 email, 또는 잘못된 password
    }
  });
});

// 프로젝트 리스트 불러오기 1 (관리 중인 리스트)
app.post('/myprojectslist/:email/masterlist', (req, res) => {
  const { email } = req.params;

  const sqlQuery1 = 'SELECT COUNT(*) FROM joinedprojects WHERE email = ?;';
  const sqlQuery2 =
    'SELECT j.code, p.title, p.description, p.deadline FROM joinedprojects j INNER JOIN projects p ON j.code = p.code WHERE j.email = ? ORDER BY p.deadline ASC;';

  db.query(sqlQuery1, [email], (err, result) => {
    if (result[0]['COUNT(*)'] === 0) {
      res.send('0'); // 관리/참여 중인 프로젝트가 존재하지 않음
    } else {
      db.query(sqlQuery2, [email], (err, result) => {
        res.send(result); // 관리/참여 중인 프로젝트 목록 저장
      });
    }
  });
});

// 프로젝트 리스트 불러오기 2 (관리/참여 중인 프로젝트)
app.post('/myprojectslist/:email/joinedlist', (req, res) => {
  const { email } = req.params;

  const sqlQuery1 = 'SELECT COUNT(*) FROM projects WHERE creatoremail = ?;';
  const sqlQuery2 =
    'SELECT code, title, description, deadline FROM projects WHERE creatoremail = ? ORDER BY deadline ASC;';

  db.query(sqlQuery1, [email], (err, result) => {
    if (result[0]['COUNT(*)'] === 0) {
      res.send('0'); // 관리 중인 프로젝트가 존재하지 않음
    } else {
      db.query(sqlQuery2, [email], (err, result) => {
        res.send(result); // 관리 중인 프로젝트 목록 저장
      });
    }
  });
});

// 프로젝트 생성하기
app.post('/myprojectslist/:email/createproject', (req, res) => {
  const { title, description, deadline } = req.body;
  const creatoremail = req.params.email;
  let code;

  const sqlQuery1 = 'SELECT code FROM projects;';
  const sqlQuery2 = 'INSERT INTO projects VALUES(?, ?, ?, ?, ?);';
  const sqlQuery3 = 'INSERT INTO joinedprojects VALUES(?, ?);';
  const sqlQuery5 = 'INSERT INTO category VALUES(?, "★ 개요");';
  const sqlQuery6 = 'INSERT INTO category VALUES(?, "공지사항");';

  db.query(sqlQuery1, [], (err, result) => {
    loop: while (true) {
      code = Math.floor(Math.random() * 1000000);

      for (let i = 0; i < result.length; i++) {
        if (code === result[i][code]) {
          continue loop;
        }
      }
      break;
    }

    db.query(
      sqlQuery2,
      [code, title, description, creatoremail, deadline],
      (err, result) => {
        db.query(sqlQuery3, [creatoremail, code], (err, result) => {
          const sqlQuery4 = `CREATE TABLE posts${code} (
              postnum			  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
              category		  VARCHAR(15) NOT NULL,
              posttitle		  VARCHAR(40) NOT NULL,
              postcontent		VARCHAR(5000) NOT NULL,
              postwriter		VARCHAR(10) NOT NULL,
              posteddate		DATETIME DEFAULT CURRENT_TIMESTAMP,
              postdeadline	DATE NOT NULL,
              email			    VARCHAR(40) NOT NULL
          );`;
          db.query(sqlQuery4, [], (err, result) => {
            db.query(sqlQuery5, [code], (err, result) => {
              db.query(sqlQuery6, [code], (err, result) => {
                res.send('1'); // 프로젝트 생성 완료
              });
            });
          });
        });
      }
    );
  });
});

// 프로젝트 참여하기
app.post('/myprojectslist/:email/joinproject', (req, res) => {
  const { email } = req.params;
  const { code } = req.body;

  const sqlQuery1 = 'SELECT COUNT(*) FROM projects WHERE code = ?;';
  const sqlQuery2 =
    'SELECT COUNT(*) FROM joinedprojects WHERE email = ? AND code = ?;';
  const sqlQuery3 = 'INSERT INTO joinedprojects VALUES(?, ?);';

  db.query(sqlQuery1, [code], (err, result) => {
    if (result[0]['COUNT(*)'] === 0) {
      res.send('0'); // 해당 프로젝트가 존재하지 않음
    } else {
      db.query(sqlQuery2, [email, code], (err, result) => {
        if (result[0]['COUNT(*)'] === 1) {
          res.send('1'); // 이미 참여 중인 프로젝트
        } else {
          db.query(sqlQuery3, [email, code], (err, result) => {
            res.send('2'); // 정상적으로 참여 완료
          });
        }
      });
    }
  });
});

// 프로젝트 탈퇴하기
app.post('/myprojectslist/:email/exitproject', (req, res) => {
  const { email } = req.params;
  const { code } = req.body;

  const sqlQuery1 =
    'SELECT COUNT(*) FROM projects WHERE code = ? AND creatoremail = ?;';
  const sqlQuery2 = 'DELETE FROM joinedprojects WHERE code = ? AND email = ?;';

  db.query(sqlQuery1, [code, email], (err, result) => {
    if (result[0]['COUNT(*)'] === 1) {
      res.send('0'); // 자신이 생성자인 프로젝트는 탈퇴 불가능
    } else {
      db.query(sqlQuery2, [code, email], (err, result) => {
        res.send('1'); // 프로젝트 탈퇴 성공
      });
    }
  });
});

// 프로젝트 페이지 내부
// // 코드별 프로젝트 페이지 불러오기
app.post('/project/:code/:category', (req, res) => {
  const { code } = req.params;
  const { email } = req.body;

  const sqlQuery1 = 'SELECT COUNT(*) FROM projects WHERE code = ?;';
  const sqlQuery2 =
    'SELECT COUNT(*) FROM joinedprojects WHERE email = ? AND code = ?;';
  const sqlQuery3 =
    'SELECT * FROM projects p INNER JOIN users u ON p.creatoremail = u.email WHERE p.code = ?;';

  db.query(sqlQuery1, [code], (err, result) => {
    if (result[0]['COUNT(*)'] === 0) {
      res.send('0'); // 프로젝트가 존재하지 않음
    } else {
      db.query(sqlQuery2, [email, code], (err, result) => {
        if (result[0]['COUNT(*)'] === 0) {
          res.send('1'); // 프로젝트는 존재하지만 참여중인 프로젝트가 아님
        } else {
          db.query(sqlQuery3, [code], (err, result) => {
            res.send(result); // 프로젝트 불러오기 성공
          });
        }
      });
    }
  });
});

// 카테고리 불러오기
app.post('/project/:code/:category/loadcategories', (req, res) => {
  const { code } = req.params;

  const sqlQuery1 = 'SELECT category FROM category WHERE code = ?;';
  db.query(sqlQuery1, [code], (err, result) => {
    res.send(result); // 카테고리 불러오기 성공
  });
});

// 카테고리 별 게시글 불러오기
app.post('/project/:code/:category/loadpost', (req, res) => {
  const { code, category } = req.params;

  const sqlQuery1 = `SELECT COUNT(*) FROM posts${code} WHERE category = ?;`;
  const sqlQuery2 = `SELECT *, DATE_FORMAT(posteddate, '%m-%d-%y') AS postdate FROM posts${code} WHERE category = ? ORDER BY postnum DESC;`;

  db.query(sqlQuery1, [category], (err, result) => {
    if (result[0]['COUNT(*)'] === 0) {
      res.send('0'); // 해당 카테고리에 글이 존재하지 않음(따로 처리할 것)
    } else {
      db.query(sqlQuery2, [category], (err, result) => {
        res.send(result); // 게시글 불러오기 성공
      });
    }
  });
});

// 카테고리 추가하기
app.post('/project/:code/:category/createcategory', (req, res) => {
  const { code } = req.params;
  const { category } = req.body;

  const sqlQuery1 =
    'SELECT COUNT(*) FROM category WHERE code = ? AND category = ?;';
  const sqlQuery2 = 'INSERT INTO category VALUES(?, ?);';

  db.query(sqlQuery1, [code, category], (err, result) => {
    if (result[0]['COUNT(*)'] === 1) {
      res.send('0'); // 같은 이름의 카테고리가 있음(추가 실패)
    } else {
      db.query(sqlQuery2, [code, category], (err, result) => {
        res.send('1'); // 카테고리 추가 성공
      });
    }
  });
});

// 카테고리 삭제하기
app.post('/project/:code/:category/deletecategory', (req, res) => {
  const { code } = req.params;
  const { category } = req.body;

  if (category === '★ 개요' || category === '공지사항') {
    res.send('0'); // 개요와 공지사항은 삭제할 수 없음
  } else {
    const sqlQuery1 = `DELETE FROM posts${code} WHERE category = ?;`;
    const sqlQuery2 = 'DELETE FROM category WHERE code = ? AND category = ?;';

    db.query(sqlQuery1, [category], (err, result) => {
      db.query(sqlQuery2, [code, category], (err, result) => {
        res.send('1'); // 카테고리 삭제 완료
      });
    });
  }
});

// 참여자 목록 불러오기
app.post('/project/:code/:category/userlist', (req, res) => {
  const { code } = req.params;

  const sqlQuery1 =
    'WITH userlist (code, email, name, nickname) AS (SELECT p.code, j.email, u.name, u.nickname FROM projects p INNER JOIN joinedprojects j ON p.code = j.code INNER JOIN users u ON j.email = u.email ORDER BY p.code) SELECT email, name, nickname FROM userlist WHERE code = ?;';
  db.query(sqlQuery1, [code], (err, result) => {
    res.send(result); // 참여자 목록 불러오기 성공
  });
});

// 프로젝트 제목, 내용, 데드라인 재설정하기
app.post('/project/:code/:category/resetting', (req, res) => {
  const { code } = req.params;
  const { title, description, deadline } = req.body;

  const sqlQuery1 =
    'UPDATE projects SET title=?, description=?, deadline=? WHERE code = ?;';

  db.query(sqlQuery1, [title, description, deadline, code], (err, result) => {
    res.send('1'); // 재설정 완료
  });
});

// 멤버 추가하기
app.post('/project/:code/:category/adduser', (req, res) => {
  const { code } = req.params;
  const { email } = req.body;

  const sqlQuery1 = 'SELECT COUNT(*) FROM users WHERE email = ?;';
  const sqlQuery2 =
    'SELECT COUNT(*) FROM joinedprojects WHERE email = ? AND code = ?;';
  const sqlQuery3 = 'INSERT INTO joinedprojects VALUES(?, ?);';

  db.query(sqlQuery1, [email], (err, result) => {
    if (result[0]['COUNT(*)'] === 0) {
      res.send('0'); // 존재하지 않는 유저 (추가 실패)
    } else {
      db.query(sqlQuery2, [email, code], (err, result) => {
        if (result[0]['COUNT(*)'] === 1) {
          res.send('1'); // 이미 참여중인 유저 (추가 실패)
        } else {
          db.query(sqlQuery3, [email, code], (err, result) => {
            res.send('2'); // 추가 성공
          });
        }
      });
    }
  });
});

// 멤버 삭제하기
app.post('/project/:code/:category/kickuser', (req, res) => {
  const { code } = req.params;
  const { email } = req.body;

  const sqlQuery1 = 'DELETE FROM joinedprojects WHERE email = ? AND code = ?;';
  db.query(sqlQuery1, [email, code], (err, result) => {
    res.send('1'); // 삭제 성공
  });
});

// 프로젝트 삭제하기
app.post('/project/:code/:category/deleteproject', (req, res) => {
  const { code } = req.params;
  const { email } = req.body;

  const sqlQuery1 =
    'SELECT COUNT(*) FROM projects WHERE code = ? AND creatoremail = ?;';
  const sqlQuery2 = 'DELETE FROM category WHERE code = ?;';
  const sqlQuery3 = `DROP TABLE posts${code};`;
  const sqlQuery4 = 'DELETE FROM joinedprojects WHERE code = ?;';
  const sqlQuery5 = 'DELETE FROM projects WHERE code = ?;';

  db.query(sqlQuery1, [code, email], (err, result) => {
    if (result[0]['COUNT(*)'] === 0) {
      res.send('0'); // 프로젝트 관리자만 삭제 가능 (삭제 실패)
    } else {
      db.query(sqlQuery2, [code], (err, result) => {
        db.query(sqlQuery3, [], (err, result) => {
          db.query(sqlQuery4, [code], (err, result) => {
            db.query(sqlQuery5, [code], (err, result) => {
              res.send('1'); // 삭제 성공
            });
          });
        });
      });
    }
  });
});

// 글 상세보기
app.post('/project/:code/:category/:postnum/detail', (req, res) => {
  const { code, postnum } = req.params;

  const sqlQuery1 = `SELECT COUNT(*) FROM posts${code} WHERE postnum = ?;`;
  const sqlQuery2 = `SELECT *, DATE_FORMAT(posteddate, '%m-%d-%y') AS postdate FROM posts${code} WHERE postnum = ?;`;

  db.query(sqlQuery1, [postnum], (err, result) => {
    if (result[0]['COUNT(*)'] === 0) {
      res.send('0'); // 존재하지 않는 게시글 (상세보기 실패)
    } else {
      db.query(sqlQuery2, [postnum], (err, result) => {
        res.send(result); // 상세보기 성공
      });
    }
  });
});

// 글 수정하기
app.post('/project/:code/:category/:postnum/update', (req, res) => {
  const { code, postnum } = req.params;
  const { category, posttitle, postcontent, postdeadline } = req.body;

  const sqlQuery1 = `UPDATE posts${code} SET category = ?, posttitle = ?, postcontent = ?, postdeadline = ? WHERE postnum = ?;`;

  db.query(
    sqlQuery1,
    [category, posttitle, postcontent, postdeadline, postnum],
    (err, result) => {
      res.send('1'); // 글 수정 완료
    }
  );
});

// 글 작성하기
app.post('/project/:code/:category/writepost/write', (req, res) => {
  const { code } = req.params;
  const { category, posttitle, postcontent, postdeadline, email } = req.body;

  const sqlQuery1 = 'SELECT name FROM users WHERE email = ?;';
  db.query(sqlQuery1, [email], (err, result) => {
    const postwriter = result[0]['name'];
    const sqlQuery2 = `INSERT INTO posts${code} (category, posttitle, postcontent, postwriter, postdeadline, email) VALUES(?, ?, ?, ?, ?, ?);`;
    db.query(
      sqlQuery2,
      [category, posttitle, postcontent, postwriter, postdeadline, email],
      (err, result) => {
        res.send('1'); // 글 작성 성공
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
