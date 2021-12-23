<template>
  <div id="dialog">
    <div class="border">
      <div @click="closeDialog" class="closeImg"></div>
      <div class="reputationChange">
        <div v-for="(item, index) in reputationList" :key="index">
          <div class="reputationEl">{{ item.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  name: "Dialog",
  components: {
    quillEditor,
  },
  data() {
    return {
      reputationList: [],
    };
  },
  mounted: function () {
    this.getReputation(); //需要触发的函数
  },
  methods: {
    getReputation() {
      console.log("get");
      this.$axios
        .get("/api/GetAllReputationSearch", {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.reputationList = res.data.data;
            console.log(this.reputationList);
            this.$message("Posted Successfully");
          } else {
            this.$message("please login first!");
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message("Net Error");
        });
    },
    closeDialog() {
      //给父组件传参
      this.$emit("closeDialog", false);
    },
  },
};
</script>
 
<style scoped>
#dialog {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
}
.message {
  text-align: center;
  position: absolute;
  top: 50%;
}
.reputationChange {
  margin-top: 30px;
  text-align: left;
  margin-left: 30px;
}
.reputationEl {
  margin-top: 20px;
  font-size: 15px;
}
.closeImg {
  width: 20px;
  height: 20px;
  float: right;
  margin-right: 5px;
  margin-top: 5px;
  cursor: pointer;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: black;
}
.border {
  text-align: center;
  background-color: white;
  border-radius: 20px;
  width: 75%;
  height: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>