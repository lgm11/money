const recordListModel = {
    data:[]as RecordItem[],
    fetch(){
        this.data = JSON.parse(window.localStorage.getItem('recordList')||'[]')as RecordItem[]
        return this.data
    },//获取数据，读
    save(){
        window.localStorage.setItem('recordList',JSON.stringify(this.data))
    },//保存数据，写
    clone(data:RecordItem[] | RecordItem){
        return JSON.parse(JSON.stringify(data))
    }
}

export default recordListModel