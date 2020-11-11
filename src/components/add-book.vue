<template>
    <div class="addBook">
      <div style="padding-top: 30px">
        <el-form label-position="left" :model="book" :rules="rules" ref="book" label-width="80px" style="width: 50%;margin: 0 auto" class="demo-ruleForm">
          <el-form-item label="书籍名称" prop="bookName">
            <el-input v-model="book.bookName"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="book.author"></el-input>
          </el-form-item>
          <el-form-item label="书籍编号">
            <el-input v-model="book.bookNumber"></el-input>
          </el-form-item>
          <!--<el-form-item label="活动区域">-->
            <!--<el-select v-model="form.region" placeholder="请选择活动区域">-->
              <!--<el-option label="区域一" value="shanghai"></el-option>-->
              <!--<el-option label="区域二" value="beijing"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item label="截止时间">
              <el-date-picker
                style="width: 100%;"
                v-model="book.deadline"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="是否推荐">
            <el-switch v-model="book.creatorRecommond"></el-switch>
          </el-form-item>
          <el-form-item label="库存" prop="count">
            <el-col :span="15" style="margin-left: 20%"><el-input v-model="book.count"></el-input></el-col>

          </el-form-item>
          <el-form-item label="书籍分类">
            <el-checkbox-group v-model="book.types">
              <el-checkbox v-for="(item,index) in types" :label="item.id" name="type" :key="index">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <!--<el-form-item label="特殊资源">-->
            <!--<el-radio-group v-model="form.resource">-->
              <!--<el-radio label="线上品牌商赞助"></el-radio>-->
              <!--<el-radio label="线下场地免费"></el-radio>-->
            <!--</el-radio-group>-->
          <!--</el-form-item>-->
          <el-form-item label="书籍简介" prop="introduce">
            <el-input type="textarea" v-model="book.introduce"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addBookSubmit('book')">立即添加</el-button>
            <el-button @click="cancelAdd">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
  import Api from '../common/api';
    export default {
        name: "add-book",
        data(){
          return{
            userInfo:'',
            book: {
              bookName: '',
              author:'',
              count:'',
              introduce:'',
              creatorRecommond:0,
              types:[]
            },
            types:[
              {
                id:1,
                name:'科幻小说'
              },
              {
                id:2,
                name:'玄幻小说'
              },
              {
                id:3,
                name:'传统文学'
              },
              {
                id:4,
                name:'外国名著'
              }
            ],
            rules:{
              bookName:[
                { required: true, message: '请输入书籍名称', trigger: 'blur' },
                { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
              ],
              author:[
                { required: true, message: '请输入作者', trigger: 'blur' }
              ],
              count:[
                { required: true, message: '请输入库存', trigger: 'blur' }
              ],
              introduce:[
                { required: true, message: '请输入书籍简介', trigger: 'blur' }
              ]
            }
          }
        },
        created(){
            this.userInfo=JSON.parse(localStorage.getItem('user'));
            if(!this.userInfo||this.userInfo==''){
              this.$router.push('/login');
              return;
            }
        },
        methods:{
          cancelAdd(){
            this.book={
              types:[]
            };
          },
          addBookSubmit(rulesForm){
            this.$refs[rulesForm].validate((valid) => {
              if (valid) {
                console.log('神话来袭',this.book);
                this.book.creatorId=this.userInfo.id;
                Api.apiJsonCall('post','/book/add_book',this.book).then(resolve=>{
                  console.log('哈哈哈',resolve);
                },reject=>{
                  this.$message({
                    message: reject.data.msg,
                    type: 'warning'
                  });
                });
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          }
        }
    }
</script>

<style scoped>
  .addBook {
    margin: 0 auto;
    width: 70%;
    background: #ffffff;
    height: 100%;
  }
</style>
