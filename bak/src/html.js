 /* HCO
  @author   HaoDong <ureygt@gmail.com> <http://www.haotown.cn>
  @license  The Star And Thank Author License (SATA)
  */
export function html(title){
        return `<div class="ew-publish">
				<div class="ew-publish-title">发表新评论 <span class="ew-publish-title-lc">#0</span> <span class="ew-publish-back">返回评论</span></div>
					<div class="ew-textarea-warp">
						<textarea node-type="textarea" name="" class="ew-textarea" placeholder="评论.." autocomplete="off" spellcheck="false"></textarea>
					</div>
					<div class="ew-info"><input class="text-block ew-author"  name="author" type="text" value="" size="30" placeholder="昵称 *" autocomplete="off"><input class="text-block ew-email"  name="email" type="email" value="" size="30" placeholder="邮箱 *" autocomplete="off"><input class="text-block ew-weburl"  name="url" type="url" value="" size="30" placeholder="网址" autocomplete="off"><div class="ew-send-btn">发送</div>
					</div>
				</div>
				<div class="ew-bar">${title}</div>
				<div class="ew-list">
				</div>`
}
export function html2(avatar,weburl,name,time,text){
		return `<div class="ew-li-main">
					<div class="ew-li-logo" style="background-image:url(${avatar})"></div>
					<div class="ew-li-com-w">
						<div class="ew-li-user"><a href="${weburl}" target="_blank">${name}</a></div>
						<div class="ew-li-time">${time}</div>
						<pre class="ew-li-com">${text}</pre>
					</div>
				</div>
				<div class="ew-li-next"></div>
				</div>`;
	
}