const model = {
    fetch(){
        return JSON.parse(window.localStorage.getItem('recordList')||'[]')as RecordItem[]
    },//获取数据，读
    save(data:RecordItem[]){
        window.localStorage.setItem('recordList',JSON.stringify(data))
    },//保存数据，写
    clone(data:RecordItem[] | RecordItem){
        return JSON.parse(JSON.stringify(data))
    }
}

export default model