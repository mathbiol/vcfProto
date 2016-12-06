console.log('vcfProto.js loaded');

// prototypes for Michael Conchez

vcfProto=function(vcf){
    var bd = vcf
    
    4
}

vcfProto.UI=function(div){
    var div = document.getElementById('vcfProtoDiv')
    console.log('UI not dev yet')
    // get instance of a VCF and parse it to VCF
    $.get('someMRSA.vcf')
     .then(function(x){
         var vcf = (VCF.parse(x)).body
         4
     })
}



