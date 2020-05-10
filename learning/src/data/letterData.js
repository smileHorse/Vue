export default {
  UpperLetter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
    'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  LowerLetter: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
    'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  ChinaLetter: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '人', '大', '天'],

  getRandomLetter(startLetter, endLetter) {
    let startIndex = this.UpperLetter.indexOf(startLetter);
    let endIndex = this.UpperLetter.indexOf(endLetter);
    let number = Math.round(Math.random() * 100);
    number = number % (endIndex + 1) + startIndex;
    let type = Math.round(Math.random() * 100) % 2 == 0;
    if (type) {
      return this.UpperLetter[number];
    } else {
      return this.LowerLetter[number];
    }
  }
}
