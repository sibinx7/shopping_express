import SETTINGS from "../../env";

export const NewsletterTemplateOLD = () => {
	return `
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta charset="utf-8">
	<style type="text/css">
		
	</style>
<div class="main">
  <div class="email-container">
    <div class="logo-div">
      <img src="https://akhlaqunaappstorage.blob.core.windows.net/akhlaqunaemailimages/akhlaquna-logo-new.png" alt="">
    </div>
    <div>
      <h1 class="main-heading">Thank you for subscribing.</h1>
      <p class="sub-heading">Please note that submission for the Akhlaquna Award will open on ${SETTINGS.AKHLAQUNA_AWARD_OPEN}. Please check your email regularly to stay up-to-date with our latest news.</p>
      <p class="sub-heading">If you have any questions or concerns, do not hesitate to contact us at akhlaqunaaward@qf.org.qa.</p>
    </div>
  </div>
  <div class="social"><!-- Facebook -->
    <div id="Facebook">
      <a target="_blank" title="Facebook" href="${SETTINGS.AKHLAQUNA_FACEBOOK_LINK}" class="social-link"></a>
    </div>
            <!-- instagram -->
    <div id="Instagram">
      <a target="_blank" title="Instagram" href="${SETTINGS.AKHLAQUNA_INSTAGRAM_LINK}" class="social-link"></a>
    </div>
            <!-- Twitter -->
    <div id="Twitter">
      <a target="_blank" title="Twitter" href="${SETTINGS.AKHLAQUNA_TWITTER_LINK}" class="social-link"></a>
    </div>
  </div>
  <div class="email-container">
    <div class="footer-link-div">
      <a href="${SETTINGS.CLIENT_DOMAIN_ABOUT}">ABOUT</a>
    </div>
    <p class="copyright">©Akhlaquna ${new Date().getFullYear()}, An initiative of Qatar Foundation. 
      <br> All Rights Reserved | 
      <a href="${SETTINGS.CLIENT_DOMAIN_TERMS}">Terms of Use</a>
    </p>
    <p class="copyright">You can 
      <a href="mailto:akhlaqunaaward@qf.org.qa?Subject=Unsubscribe%20Request">unsubscribe</a> at any time.
    </p>
  </div>
</div>
<p>SentbyQFPressoffice</p>
<img src="http://stats.akhlaquna.qa/wf/open?upn=8Q5vKwAw0OD-2FTEcGXBxa1RLOK1yW-2BPfKcFzmP8w-2Bs4wrixpEUFXRa520KT9sJOtaHgHXE2At-2BMlR8wwvFCeaNmQDPjqjM4CRV4YhTBw25NCeA4MQYzb6brgly33cV0oRMO94mMLvj56Jb7byfLFcBghrzvH6Z3xR-2FsIzyoKqmui3Ge2AShOFDvzqoyXOFBtSPUCgFH-2B5dY8McFIq6AXAvgKnY3UDhj-2FehZ3QG1h02mg-3D" alt="" width="1" height="1" border="0" style="height: 1px !important; width: 1px !important; border-width: 0px !important; margin: 0px !important; padding: 0px !important; display: none !important;" hidden="">
	`
};


export const NewsletterTemplate = () => {
	return (
		`
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta charset="utf-8">
<title>Newsletter</title>
<style>.main{width:600px;height:auto;margin:auto;border:1px solid #dedede;color:#4a4a4a}.email-container{padding:15px 35px 40px 35px}.logo-div{margin-bottom:25px}.main-heading{font-size:29px;font-weight:700}.sub-heading{font-size:23px;margin-bottom:30px}.msg-text{font-size:19px;margin:30px 0}.button-div{width:100%}.btn-3d-wrapper{display:block;padding-top:7px;padding-right:7px;overflow:hidden;border-top:1px solid #9b9b9b;border-right:1px solid #9b9b9b;position:relative}.btn-3d-wrapper:after{content:"";right:7px;border-right:1px solid #9b9b9b;display:block;height:14px;top:8px;position:absolute;transform:rotateZ(-132deg);transform-origin:left top}.btn-3d{display:block;text-decoration:none;perspective:1000px;border:none;transform-origin:right center;color:#fff;width:100%}.btn-3d .text{display:block;padding:18px 25px;background:linear-gradient(to right,#e30073 10%,#b11279);font-size:26px;transform-origin:right top;font-weight:700;text-align:center;color:#fff}.btn-3d:after,.btn-3d:before{position:absolute;content:"";display:block}.btn-3d:before{height:7px;width:100%;bottom:100%;border-left:1px solid #9b9b9b;border-bottom:1px solid #9b9b9b;left:0}.btn-3d:after{width:7px;height:98%;left:100%;border-left:1px solid #9b9b9b;border-bottom:1px solid #9b9b9b;top:0}.btn-3d:hover{text-decoration:none;color:#fff}.btn-3d:hover .text{background:linear-gradient(to right,#732282,#732282)}.social{border-top:1px solid #dedede;border-bottom:1px solid #dedede;display:flex;justify-content:space-evenly;padding:30px;margin-bottom:20px}.social #Facebook{background-image:url(https://akhlaqunaappstorage.blob.core.windows.net/akhlaqunaemailimages/Facebook_Grey.png);width:26px;height:26px;margin:0 75px}.social #Facebook:hover{background-image:url(https://akhlaqunaappstorage.blob.core.windows.net/akhlaqunaemailimages/Facebook_Press.png)}.social #Instagram{background-image:url(https://akhlaqunaappstorage.blob.core.windows.net/akhlaqunaemailimages/Instagram_Grey.png);width:26px;height:26px;margin:0 75px}.social #Instagram:hover{background-image:url(https://akhlaqunaappstorage.blob.core.windows.net/akhlaqunaemailimages/Instagram_Press.png)}.social #Twitter{background-image:url(https://akhlaqunaappstorage.blob.core.windows.net/akhlaqunaemailimages/Twitter_Grey.png);width:26px;height:26px;margin:0 75px}.social #Twitter:hover{background-image:url(https://akhlaqunaappstorage.blob.core.windows.net/akhlaqunaemailimages/Twitter_Press.png)}.social-link{width:100%;height:100%;display:flex}.footer-links{font-size:23px;font-weight:700;text-decoration:none;color:#4a4a4a}.footer-links:hover{color:#003594}.footer-link-div{padding:10px 0}.copyright{font-size:18px;color:#9b9b9b}.copyright a{color:#4a4a4a;text-decoration:none}.copyright a:hover{color:#003594}</style>
<div class="main">
  <div class="email-container">
    <div class="logo-div">
      <img src="https://akhlaqunaappstorage.blob.core.windows.net/akhlaqunaemailimages/akhlaquna-logo-new.png" alt="">
    </div>
    <div>
      <h1 class="main-heading">Thank you for subscribing.</h1>
      <p class="sub-heading">Please note that submission for the Akhlaquna Award will open on ${SETTINGS.AKHLAQUNA_AWARD_OPEN}. Please check your email regularly to stay up-to-date with our latest news.</p>
      <p class="sub-heading">If you have any questions or concerns, do not hesitate to contact us at akhlaqunaaward@qf.org.qa.</p>
    </div>
  </div>
  <div class="social"><!-- Facebook -->
    <div id="Facebook">
      <a target="_blank" title="Facebook" href="${SETTINGS.AKHLAQUNA_FACEBOOK_LINK}" class="social-link"></a>
    </div>
            <!-- instagram -->
    <div id="Instagram">
      <a target="_blank" title="Instagram" href="${SETTINGS.AKHLAQUNA_INSTAGRAM_LINK}" class="social-link"></a>
    </div>
            <!-- Twitter -->
    <div id="Twitter">
      <a target="_blank" title="Twitter" href="${SETTINGS.AKHLAQUNA_TWITTER_LINK}" class="social-link"></a>
    </div>
  </div>
  <div class="email-container">
    <div class="footer-link-div">
      <a href="${SETTINGS.CLIENT_DOMAIN_ABOUT}" class="footer-links">ABOUT</a>
    </div>
    <p class="copyright">©Akhlaquna ${((new Date()).getFullYear())}, An initiative of Qatar Foundation. 
      <br> All Rights Reserved | 
      <a href="${SETTINGS.CLIENT_DOMAIN_TERMS}">Terms of Use</a>
    </p>
    <p class="copyright">You can 
      <a href="mailto:akhlaqunaaward@qf.org.qa?Subject=Unsubscribe%20Request">unsubscribe</a> at any time.
    </p>
  </div>
</div>
<p>SentbyQFPressoffice</p>
<img src="http://stats.akhlaquna.qa/wf/open?upn=8Q5vKwAw0OD-2FTEcGXBxa1RLOK1yW-2BPfKcFzmP8w-2Bs4wrixpEUFXRa520KT9sJOtaHgHXE2At-2BMlR8wwvFCeaNmQDPjqjM4CRV4YhTBw25NCeA4MQYzb6brgly33cV0oRMO94mMLvj56Jb7byfLFcBghrzvH6Z3xR-2FsIzyoKqmui3Ge2AShOFDvzqoyXOFBtSPUCgFH-2B5dY8McFIq6AXAvgKnY3UDhj-2FehZ3QG1h02mg-3D" alt="" width="1" height="1" border="0" style="height:1px !important;width:1px !important;border-width:0 !important;margin-top:0 !important;margin-bottom:0 !important;margin-right:0 !important;margin-left:0 !important;padding-top:0 !important;padding-bottom:0 !important;padding-right:0 !important;padding-left:0 !important;">
`
	)
}