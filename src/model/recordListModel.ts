import clone from "@/lib/clone"

const recordListModel = {
    data:[]as RecordItem[],
    fetch(){
        this.data = JSON.parse(window.localStorage.getItem('recordList')||'[]')as RecordItem[]
        return this.data
    },//获取数据，读
    create(record:RecordItem){
        const record2 :RecordItem = clone(record);
        record2.createAt = new Date()
        this.data.push(record2)
        this.save()
    },
    save(){
        window.localStorage.setItem('recordList',JSON.stringify(this.data))
    },//保存数据，写
}

export default recordListModel