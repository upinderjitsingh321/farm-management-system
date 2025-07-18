const confirmOtp = (data) => {
  let title = `Verify Email`;

  let description = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Signup Mail</title>
          </head>
        <body>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td bgcolor="#F9FAFC">
              <div align="center" style="padding: 45px 0">
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 16px;
                    line-height: 1.5em;
                    max-width: 500px;
                  "
                >
                  <thead>
                    <tr>
                      <td style="text-align: center">
                        <img
                          src=""
                          style="margin-bottom: 1rem"
                          alt=""
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          background-color: #20a2b8;
                      color: white;
                          padding: 0 20px;
                          border-radius: 15px 15px 0 0;
                        "
                      >
                        <h2 align="center">Verify Email</h2>
                      </td>
                    </tr>
                  </thead>
                  <tbody
                    style="
                      background-color: white;
                      padding: 40px 20px;
                      border-radius: 0 0 15px 15px;
                      display: block;
                      box-shadow: 0 10px 30px -30px black;
                    "
                  >
                      <tr>
                        <td>
                          <p align="center">
                            <img src="https://indeedtraining.in:9020/assets/images/logo-blue.svg" alt="" />
                          </p>
                        </td>
                      </tr>
                    <tr>
                      <td>
                        <p align="center" style="margin: 0; color: #475467">
                          Hi, <strong>${data.name}</strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p
                          align="center"
                          style="color: #7a899f; margin-bottom: 0; font-size: 14px"
                        >
                        Thank you for using our service! To complete your login, please use the following One-Time Password (OTP).
                          Your OTP : ${data.otp}
                          This OTP is valid for the next 10 minutes.</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p
                          align="center"
                          style="color: #7a899f; margin-bottom: 0; font-size: 14px"
                        >
                        If you did not request this OTP or have any concerns, please contact our support team immediately.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>`;

  let completeMessage = { title, description };
  return completeMessage;
};
module.exports = {
  confirmOtp,
};
