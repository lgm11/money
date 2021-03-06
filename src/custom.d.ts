type RecordItem = {
    tags:Tag[]
    notes:string
    type:string
    account:number
    createAt?:string
}
type RootState={
    recordList : RecordItem[],
      tagList:Tag[],
      currentTag?:Tag
  }

interface Window {
  
}
type Tag = {
    id:string
    name:string
}
type TagListModel = {
    data:Tag[]
    fetch:() => Tag[]
    create:(name:string) => 'success' | 'duplicated'
    update:(id:string,name:string)=> 'success' | 'not found' | 'duplicated'
    remove:(id:string)=>boolean
    save:() => void
}
