<template>
    <div id="draw-wrapper">
        <div class="top-text">Draw !</div>
        <canvas
            id="draw-block"
            :width="canvas_width"
            :height="canvas_height"
            @mousedown="handleMouseDown"
            @mouseup="handleMouseUp"
            @mousemove="handleMouseMove"
        ></canvas>

        <div class="buttons">
            <div class="button" @click="clear">Clear it</div>
            <div class="button" @click="save">Save it</div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Index",

        data(){
          return {
              canvas: null,
              context: null,
              canvas_width: 800,
              canvas_height: 600,

              action: false,

              mouse: {
                  current: {
                      x: 0,
                      y: 0
                  }
              },

              link: ''
          }
        },
        mounted() {
            this.canvas = document.getElementById("draw-block");
            this.context = this.canvas.getContext("2d");
            this.context.translate(0.5, 0.5);
            this.context.imageSmoothingEnabled = false;
        },
        methods: {
            handleMouseDown: function(event){
                this.context.beginPath();
                this.action = true;
            },
            handleMouseUp: function(event){
                this.context.closePath();
                this.action = false;
            },
            handleMouseMove: function(event){
                this.mouse.current = {
                    x: event.pageX,
                    y: event.pageY
                };

                this.draw(event);
            },
            draw: function(){
                if (this.action) {
                    this.context.lineTo(this.mousePorision.x, this.mousePorision.y);
                    this.context.strokeStyle = "#FFFFFF";
                    this.context.lineWidth = 2;
                    this.context.stroke();
                    this.context.lineCap = 'round';
                    this.context.fillStyle = '#000000';

                }
            },
            clear: function(){
                this.context.clearRect(0, 0, this.canvas_width, this.canvas_height);
            },
            save: function(){
                let img = this.canvas.toDataURL('image/jpg').replace(/^data:image\/(png|jpg);base64,/, "");
                axios.post('/save', {
                    image: img
                })
                    .then(function(response){

                    })
                    .catch(function(error){
                        console.log(error);
                    })
            }

        },
        computed: {
            mousePorision: {
                cache: false,
                get: function () {
                    let rect = this.canvas.getBoundingClientRect();

                    return {
                        x: this.mouse.current.x - rect.left,
                        y: this.mouse.current.y - rect.top
                    }
                }
            }
        }
    }
</script>
