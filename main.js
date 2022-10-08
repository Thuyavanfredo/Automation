$(document).ready(function () {
  $(".bt:eq(0)").click(function(){
    const tx = document.getElementsByTagName("textarea");
    let inputs =[]
    for (let i = 0; i < tx.length; i++) {
      inputs.push(tx[i].value)
    }
    console.log(inputs)
    let ieTopic = inputs[0].replaceAll(/<ie-topic><pubtitle>/gi, '###-###').replaceAll('</pubtitle></ie-topic></pubref>', '###-###').split("###-###")
    let replace = [...ieTopic]
    let finder = inputs[1].replaceAll(/\n|\t/gi, '***').split('***')
    // let finderObject = {}
    // finder.map((item, index)=>{
    //   if(index%2!=0 && index>0){
    //     finderObject[item] = finder[index-1].split(",")[0]
    //   }
    // })
    // console.log(finderObject)
    replace.map((item, index)=>{
      if(index%2!=0 && index>0){
        // let ievalue = finderObject[item]
        let ievalue 
        finder.map((item_, index_)=>{
          if(item_.toLowerCase().includes(item.toLowerCase())){
            ievalue = finder[index_-1].split(",")[0]
          }
        })
        if(ievalue){
          replace[index] = `</pubref><xref controlno="${ievalue}" href="x-wc://file=${ievalue}.xml#${ievalue}" number="${ievalue}" scope="external" type="ieref">${item}</xref>`
        }else{
          replace[index] = `<ie-topic><pubtitle>${item}</pubtitle></ie-topic></pubref>`
        }
      }
    })
    // console.log(ieTopic.join("###-###"))
    navigator.clipboard.writeText(replace.join(""))
    $(".modalopen a").click()
  })
  $(".bt:eq(1)").click(function(){
    $("textarea").val("");
  })
  $(".image:nth-child(1)").click(function () {
    $(".form").toggle()
    $(".bt").toggle()
    $(".help").toggle()
  })
});
