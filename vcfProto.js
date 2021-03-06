console.log('vcfProto.js loaded');

// prototypes for Michael Conchez

vcfProto=function(url,fun){
    fun = fun || function(vp){ // default callback function to handle vcf prototype
        console.log('prototype extracted from '+url,vp)
    }
    var src={}
    //src.base=url.match(/.+\//)[0] || ""
    //src.id=url.slice(src.base.length)
    $.get(url)
     .then(function(x){
         var vcf = VCF.parse(x)
         var vcfProto = {
             id:url,
             base:"https://mathbiol.github.io/vcfProto/GenBank_CP000255.txt"
         }
         // add
         vcfProto.rem={
         }
         vcfProto.add={
         }
         vcf.body.CHROM.forEach(function(ch,i){
             var id = vcf.body.CHROM[i]+'.'+vcf.body.POS[i]
             vcfProto.rem[id]=vcf.body.REF[i]
             vcfProto.add[id]=vcf.body.ALT[i]
         })
         4
         fun(vcfProto)
     })
}

vcfProto.UI=function(div){
    var div = document.getElementById('vcfProtoDiv')
    var someVCFurl = 'https://mathbiol.github.io/vcfProto/someMRSA.vcf'
    vcfProto.UI.clickPos=function(that){
        console.log(that)
        geneBrowser.hidden=false
        geneBrowser.height="1800px"
        geneBrowser.width="800px"
        geneBrowser.parentNode.style.verticalAlign="top"
        var pos=that.textContent.match(/\.[^\.]+$/)[0].slice(1)
        geneBrowser.src='https://www.ncbi.nlm.nih.gov/nuccore/87125858?report=graph&mk='+pos+'|'+pos+'&v='+pos+':'+pos
        vcfMutation.innerHTML='<span style="color:blue">'+that.textContent+'</span>: <span style="color:green">' + vcfProto.vp.rem[that.textContent] + '</span> <i class="fa fa-long-arrow-right" style="color:red" aria-hidden="true"></i> <span style="color:green">' + vcfProto.vp.add[that.textContent] + '</span>'
        4
    }
    vcfProto.UI.overPos=function(that){
        that.style.cursor='pointer'
    }

    // assemble UI
    var h ='<h3>Converting a <a href="http://www.internationalgenome.org/wiki/Analysis/Variant%20Call%20Format/vcf-variant-call-format-version-40/" target="_blank">VCF file</a> into a JSON flavored prototype call, <a href="https://github.com/mathbiol/vcfProto" style="color:blue" target="_blank"><i class="fa fa-github-alt" aria-hidden="true"></i></a></h3>'
    h += '<hr>'
    h += 'Base sequence: [<a href="https://www.ncbi.nlm.nih.gov/nuccore/87125858" target="_blank">Gene Bank Entry</a>] [<a href="https://mathbiol.github.io/vcfProto/GenBank_CP000255.txt" target="_blank">fastA (full sequence)</a>] [<a href="https://www.ncbi.nlm.nih.gov/pubmed/16517273" target="_blank">Lancet. 2006 Mar 4;367(9512):731-9</a>]'
    h += '<br>Genomic variation: <input id="vcfUrlInput" size="50" style="color:blue">'
    h += '<hr>'
    h += '<div id="vcfTxtDiv"><b>VCF text source</b> [<span id="vcfTxtShowHide" style="color:blue">hide</span>]:<pre id="vcfTxtPre">...</pre></div>'
    h += '<hr>'
    h += '<div id="vcfJsonDiv"><b>VCF JSON call to prototypic base</b> [<span id="vcfJsonShowHide" style="color:blue">hide</span>]:<table><tr><td><pre id="vcfJsonPre">...</pre></td><td><div id="vcfMutation" style="background-color:yellow"></div><iframe id="geneBrowser" hidden="true" src="https://www.ncbi.nlm.nih.gov/nuccore/87125858?report=graph"></td></tr></table></div>'
    h += '<hr>'
    h += '<button id="vcfJsonDownload">Download JSON</button>'
    div.innerHTML=h

    vcfUrlInput.value=someVCFurl
    vcfTxtPre.style.fontSize="8"
    vcfTxtPre.style.color="green"
    vcfJsonPre.style.fontSize="9"
    vcfJsonPre.style.color="navy"
    $.get(someVCFurl)
     .then(function(x){
         vcfTxtPre.textContent=x
         vcfProto(someVCFurl,function(vp){
            vcfProto.vp=vp
            console.log('prototype extracted from '+someVCFurl,vp)
            var jsonTxt=JSON.stringify(vp,null,2)
            vcfJsonPre.innerHTML=jsonTxt.replace(/(CP00025[^\"]+)/g,'<span style="color:blue" onmouseover="vcfProto.UI.overPos(this)" onclick="vcfProto.UI.clickPos(this)">$1</span>')
            vcfJsonDownload.onclick=function(){
                jmat.saveFile(jsonTxt,vp.id.slice(vp.id.match(/.+\//)[0].length))
            }
         })
     })
    vcfTxtShowHide.onclick=vcfJsonShowHide.onclick=function(){
        var pre = $('pre',this.parentElement)[0]
        if(this.textContent=='hide'){
            this.textContent='show'
            pre.hidden=true
        }else{
            this.textContent='hide'
            pre.hidden=false
        }
    }

}
