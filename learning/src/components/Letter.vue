<template>
    <div>
      <Row class="marginBottom10">
        <Col offset="2" span="10">
          <span>起始字母: </span>
          <Select v-model="startLetter" style="width:200px">
            <Option v-for="item in letterList" :value="item" :key="item">{{ item }}</Option>
          </Select>
          <span> - 结束字母: </span>
          <Select v-model="endLetter" style="width:200px">
            <Option v-for="item in letterList" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </Col>
      </Row>
      <Row class="marginBottom10">
        <Col offset="2" span="20">
          <div id="container" style="border: 1px solid red">
            <canvas id="letterCanvas" width="600" height="600" style="border: 2px solid blue"></canvas>
          </div>
          <Button type="primary" shape="circle" icon="md-musical-note" size="large" @click="readLetter"></Button>
        </Col>
        <Col span="2"></Col>
      </Row>
    </div>
</template>

<script>
  import $ from 'jquery';
  import LetterData from '../data/letterData';

  export default {
    name: "Letter",
    mounted() {
      let self = this;

      $('#letterCanvas').click(function () {
        self.drawLetter();
      })
    },
    data() {
      return {
        letterList: LetterData.UpperLetter,
        startLetter: 'A',
        endLetter: 'I'
      }
    },
    methods: {
      drawLetter() {
        var canvas = document.getElementById("letterCanvas");
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        let letter = LetterData.getRandomLetter(this.startLetter, this.endLetter);
        context.font = "300px Arial";
        context.fillText(letter, canvas.width / 2 - 100, canvas.height / 2 + 100);
      },
      readLetter() {
        console.log('readLetter');
      }
    }
  }
</script>

<style scoped>
  .marginBottom10 {
    margin-bottom: 10px;
  }
</style>
