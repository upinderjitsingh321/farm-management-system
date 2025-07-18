const invitationEmail = (data) => {
  let title = `Verify Email`;

  let description = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Invitation</title>
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
                  <td
                    style="
                      background-color: #20a2b8;
                      color: white;
                      padding: 0 20px;
                      border-radius: 15px 15px 0 0;
                    "
                  >
                    <h2 align="center">Invitation!</h2>
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
                      <img
                        src="https://res.cloudinary.com/dwl5gzbuz/image/upload/v1728998647/hjd0onnvrbxahamgx3mq.png"
                        alt="Logo"
                      />
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p align="center" style="margin: 0; color: #475467">Hi,</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p
                      align="center"
                      style="color: #7a899f; margin-bottom: 0; font-size: 14px"
                    >
                      You've been invited to join the organization **OK
                      Tested**!
                      <br />
                      A user with the email **${data.email}** has sent this
                      invitation.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p align="center" style="color: #7a899f; font-size: 14px">
                      Use the temporary password provided below to access your
                      account:
                    </p>
                    <p
                      align="center"
                      style="font-weight: bold; color: #20a2b8; font-size: 16px"
                    >
                      ${data.password}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <a
                      href="${data.url}"
                      style="
                        text-decoration: none;
                        display: inline-block;
                        min-width: 100px;
                        text-align: center;
                        padding: 10px 30px;
                        margin: 30px auto;
                        background-color: #20a2b8;
                        color: white;
                        border-radius: 10px;
                        transition: all 0.3s ease;
                      "
                      >Join</a
                    >
                  </td>
                </tr>
                <tr>
                  <td>
                    <p
                      align="center"
                      style="color: #7a899f; margin-bottom: 0; font-size: 14px"
                    >
                      Please remember to change your password upon your first
                      login. If you didn't expect this invitation, feel free to
                      ignore this email.
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

const invitationEmailForAlreadyUser = (data) => {
  let title = `New invitation!`;

  let description = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Invitation</title>
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
              <tbody
                style="
                  background-color: white;
                  padding: 40px 20px;
                  border-radius: 15px;
                  display: block;
                  box-shadow: 0 10px 30px -30px black;
                "
              >
                <tr>
                  <td align="center">
                    <img
                      src="https://res.cloudinary.com/dwl5gzbuz/image/upload/v1728998647/hjd0onnvrbxahamgx3mq.png"
                      alt="Logo"
                      style="margin-bottom: 20px; width: 100px; height: auto"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <h2
                      align="center"
                      style="color: #333; margin: 0; text-align: center"
                    >
                      New invitation!
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p
                      align="center"
                      style="color: #7a899f; font-size: 14px; margin-top: 10px"
                    >
                      The user with the email
                      <strong>${data.email}</strong> invites you to the
                      organization <strong>${data.organizationName}</strong>.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <a
                      href="${data.url}"
                      style="
                        text-decoration: none;
                        display: inline-block;
                        min-width: 100px;
                        text-align: center;
                        padding: 10px 30px;
                        margin: 30px auto;
                        background-color: #20a2b8;
                        color: white;
                        border-radius: 10px;
                        transition: all 0.3s ease;
                      "
                      >View Invitation</a
                    >
                  </td>
                </tr>
                <tr>
                  <td>
                    <p
                      align="center"
                      style="color: #7a899f; font-size: 14px; margin-bottom: 0"
                    >
                      If you didn't expect this invitation, you can ignore this
                      email.
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
  invitationEmail,
  invitationEmailForAlreadyUser,
};
