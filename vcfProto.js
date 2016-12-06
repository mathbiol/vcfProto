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
         vcfProto.remAll={
         }
         vcfProto.add={
         }
         vcf.body.CHROM.forEach(function(ch,i){
             var id = vcf.body.CHROM[i]+'.'+vcf.body.POS[i]
             vcfProto.remAll[id]=vcf.body.REF[i]
             vcfProto.add[id]=vcf.body.ALT[i]
         })
         4
         fun(vcfProto)
     })
}

vcfProto.UI=function(div){
    var div = document.getElementById('vcfProtoDiv')
    var someVCFurl = 'https://mathbiol.github.io/vcfProto/someMRSA.vcf'

    // assemble UI
    var h ='<h3>Converting a <a href="http://www.internationalgenome.org/wiki/Analysis/Variant%20Call%20Format/vcf-variant-call-format-version-40/" target="_blank">VCF file</a> into a JSON flavored prototype call, <a href="https://github.com/mathbiol/vcfProto" style="color:blue" target="_blank"><i class="fa fa-github-alt" aria-hidden="true"></i></a></h3>'
    h += '<hr>'
    h += 'Base sequence: [<a href="https://www.ncbi.nlm.nih.gov/nuccore/87125858" target="_blank">Gene Bank Entry</a>] [<a href="https://mathbiol.github.io/vcfProto/GenBank_CP000255.txt" target="_blank">fastA (full sequence)</a>] [<a href="https://www.ncbi.nlm.nih.gov/pubmed/16517273" target="_blank">Lancet. 2006 Mar 4;367(9512):731-9</a>]'
    h += '<br>Genomic variation: <input id="vcfUrlInput" size="50" style="color:blue">'
    h += '<hr>'
    h += '<div id="vcfTxtDiv"><b>VCF text source</b> [<span id="vcfTxtShowHide" style="color:blue">hide</span>]:<pre id="vcfTxtPre">...</pre></div>'
    h += '<hr>'
    h += '<div id="vcfJsonDiv"><b>VCF JSON call to prototypic base</b> [<span id="vcfJsonShowHide" style="color:blue">hide</span>]:<pre id="vcfJsonPre">...</pre></div>'
    h += '<hr>'
    h += '<button id="vcfJsonDownload">Download JSON</button>'
    div.innerHTML=h
    vcfUrlInput.value=someVCFurl
    vcfTxtPre.style.fontSize="8"
    vcfTxtPre.style.color="green"
    $.get(someVCFurl)
     .then(function(x){
         vcfTxtPre.textContent=x
         vcfProto(someVCFurl,function(vp){
            console.log('prototype extracted from '+someVCFurl,vp)
            var jsonTxt=JSON.stringify(vp,null,2)
            vcfJsonPre.textContent=jsonTxt
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
