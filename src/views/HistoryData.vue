<template>
    <div class="container">
        <div class="title">
            <span>SESSIONS</span>
            <span>All Your Sessions</span>
        </div>
        <div class="table" style="width: 100%">
            <el-table border style="width: 100%; margin-top: 20px; font-size:50px" :data="measurementListData" :header-cell-style="tableHeaderStyle">
                <el-table-column prop="name" label="Name"></el-table-column>
                <el-table-column prop="duration" label="Duration"></el-table-column>
                <el-table-column prop="device" label="Device"></el-table-column>
                <el-table-column prop="id" label="Id"></el-table-column>
                <el-table-column fixed="right">
                    <template slot-scope="scope">
                        <div class="btGroup">
                            <div class="btView" @click="handleViewClick(scope.row)">View</div>
                            <div class="btDownload" @click="handleDownloadClick(scope.row)">Download</div>
                            <div class="btDelete" @click="handleDeleteClick(scope.row)">Delete</div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { MessageBox, Message } from 'element-ui';
export default {
    name: 'historyData',
    data(){
        return{
            measurementListData: [],
            tableHeaderStyle: {
                'background': '#636',
                'color': '#ffffff',
                'fontSize': '18px',
            }
        }
    },
    mounted(){
        this.getMeasurementList()
    },
    methods:{
        getMeasurementList(){
            this.axios.get("/measurement").then((res) => {
                if(res.data != null){
                    this.measurementListData = res.data.content
                }
            })
        },
        handleViewClick(row){
            this.$router.push('/historyData/' + row.id)
        },
        handleDownloadClick(row){
            const url = this.axios.defaults.baseURL + "/measurementValues/export?id=" + row.id;
            window.open(url);
        },
        handleDeleteClick(row){
            MessageBox.confirm('You are going to delete this record, do you want to continue?', 'Note:', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.$deletefn("/measurementValues/" + row.id).then((res) => {
                    if(res.responseCode == 0){
                        this.getMeasurementList()
                        Message({
                            type: 'success',
                            message: 'Delete Success!'
                        });
                    }
                })
            }).catch(() => {
                Message({
                    type: 'info',
                    message: 'Delete Canceled!'
                });          
            });
        }
    }
}
</script>
<style lang="scss">
.container{
    width: 90.5%;
    height: fit-content;
    float: right;
    margin-top: 10px;
    .title{
        span{
            display: block;
            &:first-child{
                font-size: 16px;
                font-weight: bold;
            }
            &:last-child{
                font-size: 14px;
            }
        }
    }
    .table{
        margin-top: 20px;
        .btGroup{
            display: flex;
            .btView{
                padding: 0 10px;
                text-align: center;
                color: #ffffff;
                background-color: #149EFA;
                margin-right: 10px;
                cursor: pointer;
                border-radius: 3px;
                font-weight: bold;
            }
            .btDownload{
                padding: 0 10px;
                text-align: center;
                color: #ffffff;
                background-color: #4DF758;
                margin-right: 10px;
                cursor: pointer;
                border-radius: 3px;
                font-weight: bold;
            }
            .btDelete{
                padding: 0 10px;
                text-align: center;
                color: #ffffff;
                background-color: #FA5A5A;
                cursor: pointer;
                border-radius: 3px;
                font-weight: bold;
            }

        }
    }
}
</style>