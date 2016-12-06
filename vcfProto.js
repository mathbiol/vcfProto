console.log('vcfProto.js loaded');

// prototypes for Michael Conchez

vcfProto=function(url,fun){
    fun = fun || function(vp){ // default callback function to handle vcf prototype
        console.log('prototype extracted from '+url,vp)
    }
    var src={}
    src.base=url.match(/.+\//)[0] || ""
    src.id=url.slice(src.base.length)
    $.get(src.id)
     .then(function(x){
         var vcf = VCF.parse(x)
         var vcfProto = {
             id:src.id,
             base:src.base
         }
         // add
         vcfProto.add={
             head:vcf.head,
             body:vcf.body
         }
         fun(vcfProto)
     })
}

vcfProto.UI=function(div){
    var div = document.getElementById('vcfProtoDiv')
    var someVCFurl = 'https://mathbiol.github.io/vcfProto/someMRSA.vcf'
    
    // assemble UI
    var h ='<h3>Converting a VCF file into a JSON favored prototype call</h3>'
    h += '<hr>'
    h += 'Source file: <input id="vcfUrlInput" size="50" style="color:blue">'
    h += '<hr>'
    h += '<div id="vcfTxtDiv"><b>VCF text</b> [<span id="vcfTxtShowHide" style="color:blue">hide</span>]:<pre id="vcfTxtPre">...</pre></div>'
    h += '<hr>'
    h += '<div id="vcfJsonDiv"><b>VCF JSON</b> [<span id="vcfJsonShowHide" style="color:blue">hide</span>]:<pre id="vcfJsonPre">...</pre></div>'
    h += '<hr>'
    div.innerHTML=h
    vcfUrlInput.value=someVCFurl
    vcfTxtPre.style.fontSize="8"
    vcfTxtPre.style.color="green"
    $.get(someVCFurl)
     .then(function(x){
         vcfTxtPre.textContent=x
         var vp = vcfProto(someVCFurl,function(vp){
            console.log('prototype extracted from '+someVCFurl,vp)
            vcfJsonPre.textContent=JSON.stringify(vp,null,3)
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
        4
    }
    4

    
}



