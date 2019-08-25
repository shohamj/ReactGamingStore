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
      alert("answer has been sent");
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
          
        <table class="es-header-body" style="background: rgb(5, 5, 44)"  width="600" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> 
         <tbody>
          <tr  style="border-collapse:collapse;"> 
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
            <hr />

           </td> 
          </tr> 
         </tbody>
        </table>
        <table style="background: rgb(5, 5, 44)"  class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"> 
         <tbody>
          <tr style="border-collapse:collapse;"> 
           <td align="center" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:40px;padding-right:40px;"> 
            <table  align="center" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
               <tbody>
               <tr align="center" style="border-collapse:collapse;" > 
                   <form onSubmit="sendEmail" align="center" style="margin:auto">
                     <h2 align="center" style="color:#4A7EB0">Support</h2>
                     <div align="center" style="margin-top: 50px; height: 100%; width: 60%;" >
                       <h4 align="left" style="color:#4A7EB0">Customer Email:</h4>
                       <p id='email' readonly="readonly" class="input-field"  style="background: white; text-align: center; height: 35px; border:2px solid rgb(5, 5, 44);"><b>` + email + `</b></p>
                     </div>
                     <div align="center" style="height: 100%; width: 60%" >
                         <h4 align="left" style="color:#4A7EB0">Question:</h4>
                         <p id='question' readonly="readonly" style="background: white; overflow-wrap: break-word; word-wrap: break-word; hyphens: auto; padding: 12px;   border:2px solid rgb(5, 5, 44);">` + message + `</p>
                     </div>
                     <p></p>
                         <div align="center" style="height: 100%; width: 60%" >
                           <h4 align="left" style="color:#4A7EB0">Answer:</h4>
                           <input id='answer'  class="input-field" style="overflow-wrap: break-word; word-wrap: break-word; hyphens: auto; padding: 12px;"  placeholder="Put your Answer here" />
                         </div>
                         <button type="submit" class="btn" style="width:40%; margin-top:10%; border-radius: 7px; background: #4A7EB0">Send answer</button>
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
  
  return (`
  <html style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">

  <head>
      <meta charset="UTF-8">
      <meta content="width=device-width, initial-scale=1" name="viewport">
      <meta content="telephone=no" name="format-detection">
      <style type="text/css">
          #outlook a {
              padding: 0;
          }
          
          .ExternalClass {
              width: 100%;
          }
          
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
              line-height: 100%;
          }
          
          .es-button {
              mso-style-priority: 100!important;
              text-decoration: none!important;
          }
          
          a[x-apple-data-detectors] {
              color: inherit!important;
              text-decoration: none!important;
              font-size: inherit!important;
              font-family: inherit!important;
              font-weight: inherit!important;
              line-height: inherit!important;
          }
          
          .es-desk-hidden {
              display: none;
              float: left;
              overflow: hidden;
              width: 0;
              max-height: 0;
              line-height: 0;
              mso-hide: all;
          }
      </style>
  
  </head>
  
  <body  style="width: 100%; font-family: helvetica, &quot;helvetica neue&quot;, arial, verdana, sans-serif; text-size-adjust: 100%; padding: 0px; margin: 0px;">
      <div class="es-wrapper-color" style="background-color:#CCCCCC;">
          <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;">
              <tbody>
                  <tr style="border-collapse:collapse;">
                      <td valign="top" style="padding:0;Margin:0;">
                          <table class="es-header-body" width="600" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;">
                              <tbody style="background: rgb(5, 5, 44);">
                                  <tr style="background: rgb(5, 5, 44)" style="border-collapse:collapse;">
                                      <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:40px;padding-right:40px;">
                                          <img align="left" style="padding:0;Margin:0;width: 4.8vw;height: 4.8vw;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Video-Game-Controller-Icon.svg/1024px-Video-Game-Controller-Icon.svg.png">
                                          <h1 align="top" style="margin-top: 3%; margin-left:10%; line-height:36px;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:30px;font-style:normal;font-weight:normal;color:#4A7EB0;"> React 2019
                                          </h1>
                                          <hr style="margin-top: 30px"/>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td>
                                          <table style="margin-top: 3%" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                              <tbody>
                                                  <tr style="border-collapse:collapse;">
                                                      <td align="center" style="padding:0;Margin:0;">
                                                          <h1 style="Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:30px;font-style:normal;font-weight:normal;color:#4A7EB0;">We recived your request and<br /> We will reply ASAP</h1></td>
                                                  </tr>
                                                  <tr style="border-collapse:collapse;">
                                                      <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:20px;">
                                                          <table width="5%" height="100%" cellspacing="0" cellpadding="0" border="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                              <tbody>
                                                                  <tr style="border-collapse:collapse;">
                                                                  
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                                  <tr style="border-collapse:collapse;">
                                                      <td align="center" style="padding:0;Margin:0;padding-bottom:10px;">
                                                          <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#666666;"><span style="font-size:16px;line-height:24px"><h3 style="color: white;">Dear Customer,</h3></span></p>
                                                      </td>
                                                  </tr>
                                                  <tr style="border-collapse:collapse;">
                                                      <td align="center" style="padding:0;Margin:0;">
                                                          <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#666666;">We've added your request to our system.
                                                              <br> Your question will be answer soon.
                                                              <h4 style="color: white;">Meanwhile you can check our amazing products</h4></p>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                                          <td>
                                              <table style="margin-top: 3%" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                  <tbody>
                                                      <tr style="border-collapse:collapse;">
                                                          <td width="520" valign="top" align="center" style="padding:0;Margin:0;">
                                                              <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                  <tbody>
                                                                      <tr style="border-collapse:collapse;">
                                                                          <td align="center">
                                                                              <div align="center" class="card" style="width:400px">
                                                                                  <img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTifObxHFz1nQFGuM62LtD3MDZoYe4mgluRrk-W2r9ux8sd57Z5kw" alt="Card image">
                                                                                  <div class="card-body">
                                                                                      <h4 class="card-title" style="color:#4A7EB0;">Racing</h4>
                                                                                      <p class="card-text">
                                                                                          <h4 style="color: white;">The most played race game is<br>
                                                                                  Need For Speed (NFS), with rate of <br>
                                                                                  5 out 5 this is the most recommended<br>
                                                                                      racing game to play</h4></p>
                                                                                  </div>
                                                                                  <div align="center" class="card" style="width:400px">
                                                                                      <img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzKQZQK5tmdgwz4KpMVkFFmcm5OadNxiSOB2ws8TklF8AU98kGug" alt="Card image">
                                                                                      <div class="card-body">
                                                                                          <h4 class="card-title" style="color:#4A7EB0;">Shotting</h4>
                                                                                          <p class="card-text">
                                                                                              <h4 style="color: white;">recently steam team added their latest<br>
                                                                                                  version for Day of infamy and insurgency<br>
                                                                                                  which made this game world wide and one of<br>
                                                                                                  the biggest shooting game of all time.</h4>
                                                                                          </p>
                                                                                          <hr />
                                                                                      </div>
                                                                                  </div>
                                                                              </div>
                                                                          </td>
                                                                      </tr>
                                                                  </tbody>
                                                              </table>
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </td>
                                  </tr>
                                  <tr>
                                      <td>
                                          <table  width="100%">
                                              <tbody >
                                                  <tr style="border-collapse:collapse;">
                                                      <td align="center" class="es-m-txt-с" esdev-links-color="#333333" align="left" style="padding:0;Margin:0;padding-bottom:10px;">
                                                          <div>
                                                              <span style="font-size:14px;color:#4A7EB0;">React2019JCT@gmail.com</span>
                                                          </div>
  
                                                      </td>
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
          <script type="text/javascript">
              var netspark_charset = "utf8";
              var qJsHost = (("https:" == document.location.protocol) ? "https://" : "http://");
              document.write(unescape("%3Cscript src='/jsQuilting/server/jsDict_utf8.js?v=1&k=23898278c1850f536d688db3614128a0' type='text/javascript'%3E%3C/script%3E"));
          </script>
          <script src="/jsQuilting/server/jsDict_utf8.js?v=1&amp;k=23898278c1850f536d688db3614128a0" type="text/javascript"></script>
          <script type="text/javascript">
              var ntsp_block_page = 'http://safepage.neto.net.il/?a=block/block1&level=-15&url=http%3A%2F%2Fviewstripo.email%2Ftemplate%2Fee345468-3ae9-4c5b-aff8-07382c6db21e&cause=Quiltingjs&user_id=361578&startm=201604';
              var ntsp_url_level = 0;
              var ntsp_user_level = -15;
          </script>
  </body>
  
  </html>

`
)
}

function outputCompanyAnswer()
{
  return(`
  `);
}

function outputKeysGenerate(userName,amount,game,price,total,status)
{
    var keyMessage = "";
    function generateKey() {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var numbers = "0123456789";
        var gameKey = "";
        var rnum;
        do{
          rnum = Math.floor(Math.random() * chars.length);
          gameKey += chars.substring(rnum,rnum+1);
          rnum = Math.floor(Math.random() * chars.length);
          gameKey += chars.substring(rnum,rnum+1);
          rnum = Math.floor(Math.random() * chars.length);
          gameKey += chars.substring(rnum,rnum+1);
          rnum = Math.floor(Math.random() * numbers.length);
          gameKey += numbers.substring(rnum,rnum+1);
          if(gameKey.length<=15)
            gameKey += "-";
        }while(gameKey.length < 19)
        console.log(gameKey);
        return gameKey;
      }
      function getGamesKey()
      {
        if(status != "accepted")
        return "";
        keyMessage = `Here is your <b style="color:#4A7EB0">React</b> game codes you need to get access to the games`;
        var allKeys = "";
        for(var i=0;i<amount;i++)
        {
           allKeys += (i+1);
           allKeys += ". ";
           allKeys += generateKey();
           allKeys += "<br />";
        }
        console.log("allKeys", allKeys);
        return allKeys;
      }
      var gamesKeys = getGamesKey();
      
    return(`
    
    <!DOCTYPE html>
    <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Add icon library -->
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
              
            <table class="es-header-body" style="background: rgb(5, 5, 44)"  width="600" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> 
             <tbody>
              <tr  style="border-collapse:collapse;"> 
               <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:40px;padding-right:40px;"> 
                <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                 <tbody><tr style="border-collapse:collapse;">
                  <td width="520" valign="top" align="left" style="padding:0;Margin:0;"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                    <tbody>
    
                        <tr style="background: rgb(5, 5, 44)"  style="border-collapse:collapse;"> 
                         <td>
                          <img align="left" style="padding:0;Margin:0;width: 4.5vw;height: 4.5vw;" src="https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiz9Iv-h57kAhUC1RoKHYI8CqAQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttp%253A%252F%252Fwww.coluxrecruitment.com%252Fhome%252Fvideo-game-controller-icon-svg%252F%26psig%3DAOvVaw1x6gHFvH53PAv3ZxXc45L3%26ust%3D1566823861024314&psig=AOvVaw1x6gHFvH53PAv3ZxXc45L3&ust=1566823861024314">
                          <h1 align="top" style="margin-top: 3%; margin-center:10%; line-height:36px;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:25px;margin-top:12px;font-style:normal;font-weight:normal;color:#4A7EB0;">React 2019
                          </h1>
                         </td> 
                        </tr>
                    </tbody>
                </table>
                <hr />
    
               </td> 
              </tr> 
             </tbody>
            </table>
            <table style="background: rgb(5, 5, 44)"  class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"> 
             <tbody>
              <tr style="border-collapse:collapse;"> 
               <td align="center" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:40px;padding-right:40px;"> 
                <table  align="center" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                   <tbody>
                   <tr align="center" style="border-collapse:collapse;" > 
                       <form onSubmit="sendEmail" align="center" style="margin:auto">
                         <h1 align="center" style="color:#66c0f4; width: 70%;">Dear, ` + userName + `</h1>
                         <div align="center" style="margin-top: 30px; height: 100%; width: 70%;" >
                                <p style="text-align: center; color:#4A7EB0;"> <h2 style="text-align: center; color:#4A7EB0;"> Your Order has been ` + status +  `. Your order is ` + amount + ` - ` + game + ` game that cost: $` + price + ` each.` + ` And the total is $` + total + `</h2> </p>
                        </div>
                        <div align="center" style="margin-top: 30px; height: 100%; width: 70%;" >
                            <p style="text-align: center; color:white;"> <h3 style="text-align: center; color:white;">` + keyMessage +  `</h3> </p>
                            <h2 id="gamesKey" style="text-align: center; color:#66c0f4">` + gamesKeys + `</h2>
                        </div>
                        <div style="height: 100%; width: 70%; background: rgb(3, 3, 31)">
                            <div align="center" style="height: 100%; width: 70%;" >
                            <p style="padding-top:3px;background: rrgb(3, 3, 31); text-align: center; color: white">
                                    <h3 style="color: #789bb6">This email was generated because of an order request to buy games
                                    </h3>
                                </p>
                                <p style="background: rgb(41, 41, 112); text-align: center; color: white">
                                    <h3 style="color: #789bb6">The React game code is required to complete the login to the game. <b style="color: white">No one can access your account without also accessing this email</b>
                                    </h3>
                                </p>
                                <p style="background: rgb(41, 41, 112); text-align: center; color: white">
                                    <h3 style="color: #789bb6"> <b style="color: white">If something went wrong with your order </b> then please send a message to the email down below and we will reply your request ASAP
                                    </h3>
                                </p>
                            </div>
                        </div>
                         <hr style="width: 50%; margin-top:15px;" />
                         <table  width="100%">
                                <tbody >
                                    <tr style="border-collapse:collapse;">
                                        <td align="center" class="es-m-txt-с" esdev-links-color="#333333" align="center" style="padding:0;Margin:0;padding-bottom:10px;">
                                            <div>
                                                <span style="font-size:14px;color:#4A7EB0;">React2019JCT@gmail.com</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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

function outputPasswordRecovery(host, token)
{
    return(`
    <!DOCTYPE html>
    <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Add icon library -->
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
	<!--
		\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/forgotPassword/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
	-->
    <body>
        <div class="es-wrapper-color" style="background-color:#CCCCCC;"> 
              
            <table class="es-header-body" style="background: rgb(5, 5, 44)"  width="600" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> 
             <tbody>
              <tr  style="border-collapse:collapse;"> 
               <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:40px;padding-right:40px;"> 
                <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                 <tbody><tr style="border-collapse:collapse;">
                  <td width="520" valign="top" align="left" style="padding:0;Margin:0;"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                    <tbody>
    
                        <tr style="background: rgb(5, 5, 44)"  style="border-collapse:collapse;"> 
                         <td>
                          <img align="left" style="padding:0;Margin:0;width: 4.5vw;height: 4.5vw;" src="https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiz9Iv-h57kAhUC1RoKHYI8CqAQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttp%253A%252F%252Fwww.coluxrecruitment.com%252Fhome%252Fvideo-game-controller-icon-svg%252F%26psig%3DAOvVaw1x6gHFvH53PAv3ZxXc45L3%26ust%3D1566823861024314&psig=AOvVaw1x6gHFvH53PAv3ZxXc45L3&ust=1566823861024314">
                          <h1 align="top" style="margin-top: 3%; margin-center:10%; line-height:36px;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:25px;margin-top:12px;font-style:normal;font-weight:normal;color:#4A7EB0;">React 2019
                          </h1>
                         </td> 
                        </tr>
                    </tbody>
                </table>
                <hr />
    
               </td> 
              </tr> 
             </tbody>
            </table>
            <table style="background: rgb(5, 5, 44)"  class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"> 
             <tbody>
              <tr style="border-collapse:collapse;"> 
               <td align="center" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:40px;padding-right:40px;"> 
                <table  align="center" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                   <tbody>
                   <tr align="center" style="border-collapse:collapse;" > 
                       <form onSubmit="sendEmail" align="center" style="margin:auto">
                         <div align="center" style="margin-top: 30px; height: 100%; width: 70%;" >
                                <p style="text-align: center; color:#4A7EB0;"> <h2 style="text-align: center; color:#4A7EB0;">You are receiving this email because you (or someone else) have requested the reset of the password for your account</h2> </p>
                        </div>
                        <div align="center" style="margin-top: 30px; height: 100%; width: 70%;" >
                            <h2 id="gamesKey" style="text-align: center; ">` + `http://` + host + `/forgotPassword/reset/` + token + `</h2>
                        </div>
                        <div style="height: 100%; width: 70%; background: rgb(3, 3, 31)">
                            <div align="center" style="height: 100%; width: 70%;" >
                            <p style="padding-top:3px;background: rrgb(3, 3, 31); text-align: center; color: white">
                                    <h3 style="color: #789bb6">This email was send because you or someone else try to access or reset your password
                                    </h3>
                                </p>
                                <p style="background: rgb(41, 41, 112); text-align: center; color: white">
                                    <h3 style="color: #789bb6">If you are receiving this email and you didn't try to access your account please contact us on the mail down below and let us know <br /> <b style="color: white">No one can access your account without also accessing this email</b> 
                                    </h3>
                                </p>
                                <p style="background: rgb(41, 41, 112); text-align: center; color: white">
                                    <h3 style="color: #789bb6"> <b style="color: white">If something went wrong with reseting your password </b> then please send us a message and we will reply to your request ASAP
                                    </h3>
                                </p>
                            </div>
                        </div>
                         <hr style="width: 50%; margin-top:15px;" />
                         <table  width="100%">
                                <tbody >
                                    <tr style="border-collapse:collapse;">
                                        <td align="center" class="es-m-txt-с" esdev-links-color="#333333" align="center" style="padding:0;Margin:0;padding-bottom:10px;">
                                            <div>
                                                <span style="font-size:14px;color:#4A7EB0;">React2019JCT@gmail.com</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
export default {outputCustomer, outputCompany, outputCompanyAnswer, outputKeysGenerate, outputPasswordRecovery};