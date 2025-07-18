const accountStatusMail = (data) => {
  let title = data.updateRequest === 1 ? `Account Activation Mail` : `Account Deativation Mail`;

  let description = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${data.updateRequest === 1 ? `Account Activation Mail` : `Account Deativation Mail`}</title>
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
                      <h2 align="center">${data.updateRequest === 1 ? `Account Activated` : `Account Deativated`}</h2>
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
                    <img src="https://res.cloudinary.com/dwl5gzbuz/image/upload/v1728998647/hjd0onnvrbxahamgx3mq.png" alt="" />
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
                       ${data.updateRequest === 1 ? `We're sending you this email because your account is reactivated by admin. `
      : `We're sending you this email because your account is deactivated by admin. `}
                        
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
  accountStatusMail,
};
