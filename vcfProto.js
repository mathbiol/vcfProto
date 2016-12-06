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
    console.log('UI not dev yet')
    var someVCFurl = 'https://mathbiol.github.io/vcfProto/someMRSA.vcf'
    var vp = vcfProto(someVCFurl,function(vp){
        console.log('prototype extracted from '+someVCFurl,vp)        
    })
    
}



