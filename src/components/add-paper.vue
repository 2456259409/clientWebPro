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
        <div class="question-class" v-for="(item , index) in paper.question" :key="index">
          <el-input
            style="width: 30%;margin-top: 20px;float: left;"
            placeholder="请输入题目"
            v-model="item.title"
            clearable>
          </el-input>
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
            v-model="textarea">
          </el-input>
        </div>

        <br>
        <br>
        <br>
        <div class="button-class">
          <el-button size="mini" round @click="addQues(1)">单选题</el-button>
          <el-button size="mini" round @click="addQues(2)">多选题</el-button>
          <el-button size="mini" round @click="addQues(3)">文本题</el-button>
      </div>

      </div>
    </div>
</template>

<script>
    export default {
        name: "add-paper",
      data(){
          return {
            paper:{
              title:'',
              question:[]
            }
         }
      },
      methods:{
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
              answer:[]
            };
            this.paper.question.push(item);
          }
        }
      }
    }
</script>

<style scoped>
  .question-class{
    display: flex;
    flex-direction: column;
    margin-left: 20px;
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
    margin-top: 100px;
    margin-bottom: 30px;
  }

</style>
