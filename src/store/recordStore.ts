import clone from "@/lib/clone";

let data:RecordItem[] | undefined= undefined
function fetchRecords(){
    data = JSON.parse(window.localStorage.getItem('recordList')||'[]')as RecordItem[]
    return data
}
function saveRecords(){
    window.localStorage.setItem('recordList',JSON.stringify(data))
}

export default{
    fetchRecords:fetchRecords,
    saveRecords:saveRecords,
    recordList :fetchRecords(),
    createRecord : (record:RecordItem)=>{
        const record2 :RecordItem = clone(record);
        record2.createAt = new Date().toISOString()
        data && data.push(record2)
        //data?.push(record2)这是新写法,叫做可选链写法
        saveRecords()
    },
}