function outputCompany(email, message)
{
  return(`
  <!DOCTYPE html>
<html>
<head>
<!-- Add icon library -->
<script>
    function sendEmail(e) {
    e.preventDefault();
    var email = document.getElementById('email').innerHTML;
    var question = document.getElementById('question').innerHTML;
    var answer = document.getElementById('answer').innerHTML;
    console.log('sending awswer email', email);
    console.log(question);
    console.log(answer);
  }
</script>
<style>
body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box;}

#outlook a {
    padding:0;
}
.ExternalClass {
    width:100%;
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
    line-height:100%;
}
.es-button {
    mso-style-priority:100!important;
    text-decoration:none!important;
}
a[x-apple-data-detectors] {
    color:inherit!important;
    text-decoration:none!important;
    font-size:inherit!important;
    font-family:inherit!important;
    font-weight:inherit!important;
    line-height:inherit!important;
}
.es-desk-hidden {
    display:none;
    float:left;
    overflow:hidden;
    width:0;
    max-height:0;
    line-height:0;
    mso-hide:all;
}


.input-container {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  height: 120%;
  margin-bottom: 15px;
}

.icon {
  padding: 10px;
  background: rgb(5, 5, 44);
  color: white;
  min-width: 50px;
  text-align: center;
}

.input-field {
  width: 100%;
  padding: 6px;
  outline: none;
}

.input-field:focus {
  border: 2px solid rgb(5, 5, 44);
}

/* Set a style for the submit button */
.btn {
  background-color: rgb(5, 5, 44);
  color: white;
  padding: 15px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.ow {
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}

.btn:hover {
  opacity: 1;
}
</style>
</head>
<body>
    <div class="es-wrapper-color" style="background-color:#CCCCCC;"> 
          
        <table class="es-header-body" width="600" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> 
         <tbody>
          <tr style="background: rgb(5, 5, 44)"  style="border-collapse:collapse;"> 
           <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:40px;padding-right:40px;"> 
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
             <tbody><tr style="border-collapse:collapse;"> 
              <td width="520" valign="top" align="center" style="padding:0;Margin:0;"> 
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                <tbody>
                    <tr style="background: rgb(5, 5, 44)"  style="border-collapse:collapse;"> 
                     <td>
                      <img align="left" style="padding:0;Margin:0;width: 6vw;height: 6vw;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Video-Game-Controller-Icon.svg/1024px-Video-Game-Controller-Icon.svg.png">
                      <h1 align="top" style="margin-top: 3%; margin-left:10%; line-height:36px;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:30px;font-style:normal;font-weight:normal;color:#4A7EB0;">React 2019
                      </h1>
                     </td> 
                    </tr>
                </tbody>
            </table>
           </td> 
          </tr> 
         </tbody>
        </table>
        <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"> 
         <tbody>
          <tr style="border-collapse:collapse;"> 
           <td align="center" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:40px;padding-right:40px;"> 
            <table align="center" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
               <tbody>
               <tr align="center" style="border-collapse:collapse;"> 
                   <form onSubmit="sendEmail" align="center" style="margin:auto">
                     <h2 align="center">Support</h2>
                     <hr style="width: 50%; height: 5px; background: rgb(5, 5, 44)" />
                     <div align="center" style="margin-top: 50px; height: 100%; width: 60%" >
                       <h4 align="left">Customer Email:</h4>
                       <p id='email' readonly="readonly" class="input-field" style="text-align: center; height: 35px; border:2px solid rgb(5, 5, 44);">` + email + `</p>
                     </div>
                     <div align="center" style="height: 100%; width: 60%" >
                         <h4 align="left">Question:</h4>
                         <p id='question' readonly="readonly" style="overflow-wrap: break-word; word-wrap: break-word; hyphens: auto; padding: 12px;   border:2px solid rgb(5, 5, 44);">` + message + `</p>
                     </div>
                     <p></p>
                         <div align="center" style="height: 100%; width: 60%" >
                           <h4 align="left">Answer:</h4>
                           <input id='answer'  class="input-field" style="overflow-wrap: break-word; word-wrap: break-word; hyphens: auto; padding: 12px;"  placeholder="Put your Answer here" />
                         </div>
                         <button type="submit" class="btn" style="width:40%; margin-top:10%">Send answer</button>
                       </form>
                     </tr> 
                 </tbody>
            </table>
           </td> 
          </tr> 
         </tbody>
        </table>
        </td> 
       </tr> 
      </tbody>
     </table> 
    </div>
</html>


  
  


  
  `)
}


function outputCustomer(message)
{
  
  return (`<html style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;"><head> 
  <meta charset="UTF-8"> 
  <meta content="width=device-width, initial-scale=1" name="viewport"> 
  <meta content="telephone=no" name="format-detection"> 
  <style type="text/css">
#outlook a {
    padding:0;
}
.ExternalClass {
    width:100%;
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
    line-height:100%;
}
.es-button {
    mso-style-priority:100!important;
    text-decoration:none!important;
}
a[x-apple-data-detectors] {
    color:inherit!important;
    text-decoration:none!important;
    font-size:inherit!important;
    font-family:inherit!important;
    font-weight:inherit!important;
    line-height:inherit!important;
}
.es-desk-hidden {
    display:none;
    float:left;
    overflow:hidden;
    width:0;
    max-height:0;
    line-height:0;
    mso-hide:all;
}
</style> 
 
</head> 
 <body  style="width: 100%; font-family: helvetica, &quot;helvetica neue&quot;, arial, verdana, sans-serif; text-size-adjust: 100%; padding: 0px; margin: 0px;"> 
  <div class="es-wrapper-color" style="background-color:#CCCCCC;"> 
   <!--[if gte mso 9]>
      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
        <v:fill type="tile" color="#cccccc"></v:fill>
      </v:background>
    <![endif]--> 
    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;"> 
    <tbody><tr style="border-collapse:collapse;"> 
     <td valign="top" style="padding:0;Margin:0;"> 
      <table  class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top;"> 
        <tbody>
         <tr style="border-collapse:collapse;"> 
         <td  class="es-adaptive" align="center" style="padding:0;Margin:0;"> 
          <table class="es-header-body" width="600" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> 
            <tbody><tr style="background: rgb(5, 5, 44)"  style="border-collapse:collapse;"> 
             <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:40px;padding-right:40px;"> 
              <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                <tbody><tr style="border-collapse:collapse;"> 
                 <td width="520" valign="top" align="center" style="padding:0;Margin:0;"> 
                  <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                   <td >
                     <img align="left" style="padding:0;Margin:0;width: 15vw;height: 15vw;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Video-Game-Controller-Icon.svg/1024px-Video-Game-Controller-Icon.svg.png">
                       <h1 align="top" style="margin-top: 3%; margin-left:10%; line-height:36px;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:30px;font-style:normal;font-weight:normal;color:#4A7EB0;">&nbsp React 2019
                      </h1>
                   </td> 
                     <tbody>
                   </tr> 
                  </tbody></table></td> 
                </tr> 
              </tbody></table></td> 
            </tr> 
          </tbody></table></td> 
        </tr> 
      </tbody></table> 
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> 
         <tbody><tr style="border-collapse:collapse;"> 
          <td align="center" style="padding:0;Margin:0;"> 

           <table style="background: rgb(5, 5, 44)" class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"> 
             <tbody><tr style="border-collapse:collapse;"> 

              <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:40px;padding-right:40px;"> 

                <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                  <tbody><tr  style="border-collapse:collapse;"> 
                  <td width="520" valign="top" align="center" style="padding:0;Margin:0;"> 
                    <table style="margin-top: 3%" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                     <tbody><tr   style="border-collapse:collapse;"> 
                      <td align="center" style="padding:0;Margin:0;"><h1 style="Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:30px;font-style:normal;font-weight:normal;color:#4A7EB0;">Your question has been added</h1></td> 
                     </tr> 
                     <tr  style="border-collapse:collapse;"> 
                      <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:20px;"> 
                       <table width="5%" height="100%" cellspacing="0" cellpadding="0" border="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                         <tbody><tr  style="border-collapse:collapse;"> 

                        </tr> 
                       </tbody></table></td> 
                     </tr> 
                     <tr style="border-collapse:collapse;"> 
                      <td align="center" style="padding:0;Margin:0;padding-bottom:10px;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#666666;"><span style="font-size:16px;line-height:24px"><h3 style="color: white;">Hi, David Salmon,</h3></span></p></td> 
                     </tr> 
                     <tr style="border-collapse:collapse;"> 
                      <td align="center" style="padding:0;Margin:0;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#666666;">We've added your request to our system. <br> Your question will be answer soon. <h4 style="color: white;">Meanwhile you can check our amazing products</h4></p></td> 
                     </tr> 
                   
                   </tbody></table></td> 
                 </tr> 
               </tbody></table></td> 
             </tr> 
             <tr style="border-collapse:collapse;"> 
              <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:40px;padding-right:40px;"> 
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                 <tbody><tr style="border-collapse:collapse;"> 
                  <td width="520" valign="top" align="center" style="padding:0;Margin:0;"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                     <tbody><tr style="border-collapse:collapse;"> 
                      <td align="center" style="padding:0;Margin:0;padding-right:5px;padding-top:20px;padding-bottom:20px;"> 
                       <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                         <tbody><tr style="border-collapse:collapse;"> 
                            <div align="center" class="card" style="width:400px">
                                <img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTifObxHFz1nQFGuM62LtD3MDZoYe4mgluRrk-W2r9ux8sd57Z5kw" alt="Card image">
                                <div class="card-body">
                                <h4 class="card-title" style="color:#4A7EB0;">Racing</h4>
                                <p class="card-text"><h4 style="color: white;">The most played race game is<br>
                                                         Need For Speed (NFS), with rate of <br>
                                                         5 out 5 this is the most recommended<br>
                                                          racing game to play</h4></p>
                            </div>
                            <div align="center" class="card" style="width:400px">
                                <img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzKQZQK5tmdgwz4KpMVkFFmcm5OadNxiSOB2ws8TklF8AU98kGug" alt="Card image">
                                <div class="card-body">
                                <h4 class="card-title" style="color:#4A7EB0;">Shotting</h4>
                                <p class="card-text"><h4 style="color: white;">recently steam team added their latest<br>
                                                    version for Day of infamy and insurgency<br>
                                                    which made this game world wide and one of<br>
                                                    the biggest shooting game of all time.</h4>
                                                    </p>
                            </div>
                          <td style="padding:0;Margin:0px;border-bottom:1px solid #FFFFFF;background:rgba(0, 0, 0, 0) none repeat scroll 0% 0%;height:1px;width:100%;margin:0px;"></td> 
                         </tr> 
                       </tbody></table></td> 
                     </tr> 
                   </tbody></table></td> 
                 </tr> 
               </tbody></table></td> 
             </tr> 
           </tbody></table></td> 
         </tr> 
       </tbody></table> 
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> 
         <tbody><tr style="border-collapse:collapse;"></tr> 
         <tr style="border-collapse:collapse;"> 
          <td align="center" style="padding:0;Margin:0;"> 
           <table class="es-footer-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#EFEFEF;" width="600" cellspacing="0" cellpadding="0" bgcolor="#efefef" align="center"> 
             <tbody><tr style="border-collapse:collapse;"> 
              <td align="left" style="padding:20px;Margin:0;"> 
               <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="194"><![endif]--> 
               <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;"> 
                 <tbody><tr style="border-collapse:collapse;"> 
                  <td class="es-m-p0r es-m-p20b" width="174" align="center" style="padding:0;Margin:0;"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                     <tbody><tr style="border-collapse:collapse;"> 
                     </tr> 
                   </tbody></table></td> 
                  <td class="es-hidden" width="20" style="padding:0;Margin:0;"></td> 
                 </tr> 
               </tbody></table> 
               <!--[if mso]></td><td width="173"><![endif]--> 
               <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;"> 
                 <tbody><tr style="border-collapse:collapse;"> 
                  <td class="es-m-p0r es-m-p20b" width="173" align="center" style="padding:0;Margin:0;"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                     <tbody><tr style="border-collapse:collapse;"> 
                     </tr> 
                   </tbody></table></td> 
                 </tr> 
               </tbody></table> 
               <!--[if mso]></td><td width="20"></td><td width="173"><![endif]--> 
               <table cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                 <tbody><tr style="border-collapse:collapse;"> 
                  <td class="es-m-p0r es-m-p20b" width="173" align="center" style="padding:0;Margin:0;"> 
                   <table  width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                     <tbody><tr style="border-collapse:collapse;"> 
                      <td class="es-m-txt-с es-m-txt-l" esdev-links-color="#333333" align="left" style="padding:0;Margin:0;padding-bottom:10px;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#333333;"><span  align="center" style="font-size:20px;line-height:30px;">+972 0546763237<br></span></p></td> 
                     </tr> 
                     <tr style="border-collapse:collapse;"> 
                      <td class="es-m-txt-с" esdev-links-color="#333333" align="left" style="padding:0;Margin:0;padding-bottom:10px;"> 
                       <div style="color:#333333;"> 
                        <span style="font-size:14px;">React2019JCT@gmail.com</span> 
                       </div></td> 
                     </tr> 
                   </tbody></table></td> 
                 </tr> 
               </tbody></table> 
               <!--[if mso]></td></tr></table><![endif]--></td> 
             </tr> 
             <tr style="border-collapse:collapse;"> 
              <td align="left" style="padding:0;Margin:0;padding-bottom:15px;padding-left:20px;padding-right:20px;"> 
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                 <tbody><tr style="border-collapse:collapse;"> 
                  <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                     <tbody><tr style="border-collapse:collapse;"> 
                      <td esdev-links-color="#333333" align="left" style="padding:0;Margin:0;">
                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:12px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:18px;color:#333333;">You are receiving this email because you have visited our site or asked us about regular newsletter.</p>
                     </tr> 
                   </tbody></table></td> 
                 </tr> 
               </tbody></table></td> 
             </tr> 
           </tbody></table></td> 
         </tr> 
       </tbody></table> 
      </td> 
     </tr> 
   </tbody></table> 
  </div>  
 <script type="text/javascript">var netspark_charset = "utf8"; var qJsHost = (("https:" == document.location.protocol) ? "https://" : "http://");document.write(unescape("%3Cscript src='/jsQuilting/server/jsDict_utf8.js?v=1&k=23898278c1850f536d688db3614128a0' type='text/javascript'%3E%3C/script%3E"));</script><script src="/jsQuilting/server/jsDict_utf8.js?v=1&amp;k=23898278c1850f536d688db3614128a0" type="text/javascript"></script><script type="text/javascript">var ntsp_block_page = 'http://safepage.neto.net.il/?a=block/block1&level=-15&url=http%3A%2F%2Fviewstripo.email%2Ftemplate%2Fee345468-3ae9-4c5b-aff8-07382c6db21e&cause=Quiltingjs&user_id=361578&startm=201604';var ntsp_url_level = 0;var ntsp_user_level = -15;</script>
</body></html>`
)
}

function outputCompanyAnswer()
{
  return(`
  `);
}

export default {outputCustomer, outputCompany, outputCompanyAnswer};