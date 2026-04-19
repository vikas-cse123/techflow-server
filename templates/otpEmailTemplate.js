export const otpEmailTemplate = ({
  appName,
  otp,
  expiry = "5 minutes",
}) => `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#f5f7fb; font-family:Arial, sans-serif;">

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding:40px 16px;">

          <!-- Container -->
          <table role="presentation" width="100%" style="max-width:520px; background:#ffffff; border-radius:12px; overflow:hidden;">

            <!-- Header -->
            <tr>
              <td style="padding:22px 28px; background:#111827; color:#ffffff;">
                <div style="font-size:16px; font-weight:600; letter-spacing:0.5px;">
                  ${appName}
                </div>
  
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:34px 28px; text-align:center;">

                <div style="font-size:20px; font-weight:600; color:#111827;">
                  Verify your email
                </div>

                <p style="font-size:14px; color:#6b7280; margin-top:10px; line-height:1.5;">
                  Use the OTP below to complete your verification.  
                  This code will expire in <b>${expiry}</b>.
                </p>

                <!-- OTP BOX -->
                <div style="margin:28px 0;">
                  <div style="
                    display:inline-block;
                    padding:14px 22px;
                    font-size:26px;
                    letter-spacing:8px;
                    font-weight:700;
                    background:#f3f4f6;
                    border:1px solid #e5e7eb;
                    border-radius:10px;
                    color:#111827;
                  ">
                    ${otp}
                  </div>
                </div>



              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding:0 28px;">
                <div style="height:1px; background:#e5e7eb;"></div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:18px 28px; text-align:center; font-size:12px; color:#9ca3af;">
                If you didn’t request this, you can safely ignore this email.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
</html>
`;