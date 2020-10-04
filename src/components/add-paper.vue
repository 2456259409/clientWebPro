<template>
    <div style="width: 100%;">
      <div class="paper-class">
        <el-input
          style="width: 30%;padding: 0 auto;margin-top: 10px"
          placeholder="请输入标题"
          v-model="paper.title"
          clearable>
        </el-input>
        <div style="border: 1px solid #EEEEEE;margin-top: 10px"></div>
        <div class="question-class"  v-for="(item , index) in paper.question" :key="index" :class="{'activeItem':index==activeIndex}"
             @mouseenter="checkOneItem(index)" @mouseleave="outOneItem()">
          <div class="item-title-class">
            <el-input
              style="width: 30%;margin-top: 20px;float: left;"
              placeholder="请输入题目"
              v-model="item.title"
              clearable>
            </el-input>
            <span style="margin-top: 28px;margin-left: 10px;color: #DD001B">{{(index+1)+'.'+item.type}}</span>
          </div>
          <el-input
            v-for="(item1 , index1) in item.answer" :key="index1"
            style="width: 40%;margin-top: 5px;border: 1px solid #FFFFFF"
            :placeholder="'选项'+item1.code"
            v-model="item1.content"
            clearable>
          </el-input>
          <el-input
            v-if="item.code==3"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="item.textarea">
          </el-input>
          <div v-if="index!=activeIndex" style="height: 30px"></div>
          <div v-if="index==activeIndex" style="height: 30px">
            <el-button size="mini" round @click="deleteItem(index)">删除</el-button>
            <el-button size="mini" round @click="upMove(index)">上移</el-button>
            <el-button size="mini" round @click="downMove(index)">下移</el-button>
          </div>
        </div>

        <el-button type="primary" @click="submitPaper" style="margin-top: 80px">提交</el-button>
        <el-button type="primary" @click="clearPaper" style="margin-top: 80px">清空</el-button>

        <div class="button-class">
          <el-button size="mini" round @click="addQues(1)">单选题</el-button>
          <el-button size="mini" round @click="addQues(2)">多选题</el-button>
          <el-button size="mini" round @click="addQues(3)">文本题</el-button>
      </div>

      </div>
    </div>
</template>

<script>
  import api from '../common/api'
    export default {
        name: "add-paper",
      data(){
          return {
            activeIndex:-1,
            userInfo:'',
            paper:{
              title:'',
              question:[]
            }
         }
      },
      created(){
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
