<template>
    <div style="width: 100%;">

    </div>
</template>

<script>
  import api from '../common/api'
    export default {
        name: "add-paper",
      data(){
          return {
            isEdit:false,
            activeIndex:-1,
            userInfo:'',
            paper:{
              title:'',
              question:[]
            }
         }
      },
      created(){
          //console.log('已经提交');
          let id = this.$route.query.id;
          if(id){
            this.isEdit=true;
            api.apiCall('get','/paper/getById/'+id).then(resolve=>{
              // console.log(resolve.data.data);
              this.paper=resolve.data.data;
            },reject=>{
              console.log(reject);
              this.$message.error(reject.data.msg);
            })
          }else{
            this.paper={
              title:'',
              question:[]
            };
          }
        // console.log(vm);//当前组件的实例
        let user = api.getStorageItem('user');
        if (!user) {
          this.$router.push('/login');
        } else if (user === '过期') {
          localStorage.removeItem('user');
          this.$message.error('您的登录已经过期，请重新登录');
          this.$router.push('/login');
        } else {
          this.userInfo = user;
        }
      },
      methods:{
        updatePaper(){
          api.apiJsonCall('post','/paper/updatePaper',this.paper).then(resolve=>{
            this.$message.success('修改成功');
          },reject=>{
            console.log(reject);
            this.$message.error(reject.data.msg);
          })
        },
        clearPaper(){
          this.paper={};
        },
        upMove(index){
          if(index===0){
            return ;
          }
          let i1=this.paper.question[index];
          this.paper.question[index]=this.paper.question[index-1];
          this.paper.question[index-1]=i1;
          this.activeIndex=-1;

        },
        downMove(index){
          if(index===this.paper.question.length-1){
            return ;
          }
          let i1=this.paper.question[index];
          this.paper.question[index]=this.paper.question[index+1];
          this.paper.question[index+1]=i1;
          this.activeIndex=-1;
        },
        deleteItem(index){
          this.paper.question.splice(index,1);
        },
        outOneItem(){
          this.activeIndex=-1;
          console.log('ok123')
        },
        checkOneItem(index){
          this.activeIndex=index;
        },
        submitPaper(){
          // console.log('任建',this.paper)
          if(this.paper.title===''){
            this.$alert("请填写问卷标题", '提示');
            return;
          }
          let questions=this.paper.question;
          if(questions.length==0){
            this.$alert("请填写至少一道题", '提示');
          }
          for(let i=0;i<questions.length;i++){
            let question=questions[i];
            if(question.title===''){
              this.$alert("您的第"+(i+1)+"题没有标题，请填写", '提示');
              return;
            }
            if(question.code!=3){
              for(let j=0;j<question.answer.length;j++){
                if(question.answer[j].content===''){
                  this.$alert("您的第"+(i+1)+"题"+(j+1)+"项没有填写，请填写!", '提示');
                  return;
                }
              }
            }
          }
          this.paper.userId=this.userInfo.id;
          this.paper.createUsername=this.userInfo.username;
          api.apiJsonCall('post','/paper/addPaper',this.paper).then(resolve=>{
            this.$message.success('提交成功');
          },reject=>{
            console.log(reject);
            this.$message.error(reject.data.msg);
          })
        },
        addQues(num){
          if(num===1){
            let item={
              type:'单选题',
              code:1,
              title:'',
              answer:[
                {code:'1',content:''},
                {code:'2',content:''},
                {code:'3',content:''},
                {code:'4',content:''}
              ]
            };
            if(this.isEdit){
              item.paperId=this.paper.id;
            }
            this.paper.question.push(item);
          }
          if(num===2){
            let item={
              type:'多选题',
              code:2,
              title:'',
              answer:[
                {code:'1',content:''},
                {code:'2',content:''},
                {code:'3',content:''},
                {code:'4',content:''}
              ]
            };
            if(this.isEdit){
              item.paperId=this.paper.id;
            }
            this.paper.question.push(item);
          }
          if(num===3){
            let item={
              type:'文本题',
              code:3,
              title:'',
              answer:[],
              textarea:''
            };
            if(this.isEdit){
              item.paperId=this.paper.id;
            }
            this.paper.question.push(item);
          }
        }
      }
    }
</script>

<style scoped>
  .activeItem{
    background: #EEEEEE;
  }
  .item-title-class{
    display: flex;
  }
  .question-class{
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 30px;
  }
  .paper-class{
    background: #FFFFFF;
    border: 2px solid #FFFFFF;
    margin: 20px auto;
    width: 70%;
    height: 100%;
  }
  .button-class{
    display: flex;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 30px;
  }

</style>
