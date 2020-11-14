<template>
  <div class="myBook">
    <div style="padding-top: 30px">
      <div style="display: flex;justify-content: center;align-items: center;margin-bottom: 50px">
        <el-button id="allbooks" type="primary" plain @click="chanegKeyword(1)">全部图书</el-button>
        <el-button type="primary" plain @click="chanegKeyword(2)">未审核</el-button>
        <el-button type="primary" plain @click="chanegKeyword(3)">审核通过</el-button>
      </div>
      <el-table
        :data="books"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="书籍ID:">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="书籍名称:">
                <el-input
                  :placeholder="props.row.bookName"
                  v-model="props.row.bookName"
                  clearable>
                </el-input>
                <!--<span>{{ props.row.bookName }}</span>-->
              </el-form-item>
              <el-form-item label="书籍库存:">
                <el-input
                  :placeholder="props.row.count"
                  v-model="props.row.count"
                  clearable>
                </el-input>
                <!--<span>{{ props.row.bookName }}</span>-->
              </el-form-item>
              <el-form-item label="书籍类别:">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="创建时间:">

                <span>{{ timeComputed(props.row.createTime) }}</span>
              </el-form-item>
              <el-form-item label="下架时间:">
                <el-date-picker
                  style="width: 100%;"
                  type="datetime"
                  v-model="props.row.deadline"
                  :placeholder="timeComputed(props.row.deadline)"
                  default-time="12:00:00">
                </el-date-picker>
                <!--<span>{{ timeComputed(props.row.deadline) }}</span>-->
              </el-form-item>
              <el-form-item label="书籍描述:">
                <span>{{splitIntrodeceStr(props.row.introduce)}}</span>
              </el-form-item>
              <el-form-item>
                <!--<el-button type="primary" size="small" plain @click="updateBook(props.row)">修改描述</el-button>-->
                <el-button type="primary" size="small" plain @click="updateBook(props.row)">提交修改</el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="书籍编号"
          prop="bookNumber">
        </el-table-column>
        <el-table-column
          label="书籍名称"
          prop="bookName">
        </el-table-column>
        <el-table-column
          label="作者">
          <template slot-scope="scope">
            <el-input
              style="width: 60%"
              :placeholder="scope.row.author"
              v-model="scope.row.author"
              clearable>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteBook(scope.row.id)" type="text" size="small">删除</el-button>
            <el-button @click="throughBook(scope.row.id)" type="text" size="small" v-if="scope.row.status!=2 && userInfo.id===10">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import Api from '../common/api';
  import  qs from 'qs';
  export default {
    name: "my-book",
    data() {
      return {
        isEditIntroduce:false,
        keyword: '',
        userInfo:'',
        books:[]
      }
    },
    created() {
      this.userInfo=JSON.parse(localStorage.getItem('user'));
      if(!this.userInfo||this.userInfo===''){
        this.$router.push('/login');
        return ;
      }
      document.getElementById('allbooks').click();
    },
    methods: {
      throughBook(id){
        this.$confirm('是否通过该书审核?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data={
            id:id,
            userId:this.userInfo.id
          };
          Api.apiCall('get','/book/through_book?'+qs.stringify(data)).then(resolve=>{
            this.$message({
              message: resolve.data.data,
              type: 'success'
            });
            this.books.forEach((item,index)=>{
              if(id===item.id){
                item.status=2;
              }
            })
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });



      },
      updateBook(book){
        console.log('任建来了',book);
        Api.apiJsonCall('post','/book/update_book',book).then(resolve=>{
          this.$message({
            message: resolve.data.data,
            type: 'success'
          });
        },reject=>{
          this.$message.error(reject.data.msg);
        })
      },
      deleteBook(id){
        console.log('这是书籍id',id);
        Api.apiCall('get','/book/delete_book?id='+id).then(resolve=>{
          this.$message({
            message: resolve.data.data,
            type: 'success'
          });
          this.books.forEach((item,index,arr) => {
            if(item.id === id){
              this.books.splice(index,1)
            }
          });
        },reject=>{
          this.$message.error(reject.data.msg);
        })
      },
      timeComputed(time){
        let date=new Date(time).format('yyyy-MM-dd HH:mm:ss');
        return date;
      },
      splitIntrodeceStr(str){
        let s=str+'..........';
        return s.substr(0,13)+'...'
      },
      chanegKeyword(index) {
        let data={
          keyword: index,
          userId:this.userInfo.id,
          pageSize:10,
          pageNum:0
        };
        let params=qs.stringify(data);
        Api.apiCall('get','/book/get_books?'+params,data).then(resolve=>{
          this.books=resolve.data.data;
        },reject=>{
          console.log(reject.msg);
        })
      }
    }
  }
</script>

<style scoped>
  .myBook {
    margin: 0 auto;
    width: 70%;
    background: #ffffff;
    height: 100%;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 6px;
    width: 45%;
  }

  .aa .el-form-item{
    width: 100%;
  }


</style>
