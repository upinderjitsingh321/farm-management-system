const otpTemplate = (data) => {
  let title = `Forgot Password Mail`;

  let description = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Forgot Password Mail</title>
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
                      src="https://indeedtraining.in:9020/assets/images/logo-blue.svg"
                      style="margin-bottom: 1rem"
                      alt="Company Logo"
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
                    <h2 align="center">Verify Your Account</h2>
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
                    <p align="center" style="margin: 0; color: #475467">
                      Hi,
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p
                      align="center"
                      style="color: #7a899f; margin-bottom: 0; font-size: 14px"
                    >
                      We're sending you this email because you requested a
                      password reset. Please use the following OTP to reset
                      your password:
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 20px 0">
                    <div
                      style="
                        font-size: 24px;
                        font-weight: bold;
                        color: #20a2b8;
                        padding: 10px 20px;
                        border: 1px solid #20a2b8;
                        border-radius: 10px;
                        display: inline-block;
                      "
                    >
                      ${data.otp}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p
                      align="center"
                      style="color: #7a899f; margin-bottom: 0; font-size: 14px"
                    >
                      If you didn't request a password reset, you can ignore
                      this email. Your password will not be changed.
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
</html>
`;

  let completeMessage = { title, description };
  return completeMessage;
};

module.exports = {
  otpTemplate,
};
