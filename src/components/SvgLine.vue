<template>
    <svg :style="{ height: opts.height + 'px', width: opts.width + 'px' }">
        <!-- <polygon :fill="'#103f48'" :points="polygonPoints">
        </polygon> -->
       <polyline fill="none" :points="polylinePoints" :stroke="'#965CE4'" :stroke-width="opts.strokeWidth" stroke-linecap="square">
       </polyline>
    </svg>
</template>
<script>
export default {
  watch: {
    values: {
      handler (val) {
        this.opts.width = this.width || 240
        this.opts.height = this.height || 56
        this.draw()
      },
      deep: true

    }

  },
  data: function () {
    return {
      coords: [],
      opts: { strokeWidth: 1 }
    }
  },
  props: {

    values: {
      type: Array,
      required: true
    },
    width: {
      type: Number,
      required: false
    },
    height: {
      type: Number,
      required: false
    }
  },
  created: function () {

  },
  computed: {
    polylinePoints: function () {
      return this.coords.slice(2, this.coords.length - 2).join(' ')
    },
    polygonPoints: function () {
      return this.coords.join()
    }
  },
  mounted: function () {

  },
  methods: {
    draw () {
      var opts = this.opts
      var values = this.values
      console.log(values, 'valssss')
      if (values.length === 1) values.push(values[0])
      // eslint-disable-next-line
      var max = Math.max.apply(Math, opts.max == undefined ? values : values.concat(opts.max))
      // eslint-disable-next-line
      var min = Math.min.apply(Math, opts.min == undefined ? values : values.concat(opts.min))

      var strokeWidth = opts.strokeWidth
      var width = opts.width
      var height = opts.height - strokeWidth
      var diff = max - min

      var xScale = this.x = function (input) {
        return input * (width / (values.length - 1))
      }

      var yScale = this.y = function (input) {
        var y = height

        if (diff) {
          y -= ((input - min) / diff) * height
        }

        return y + strokeWidth / 2
      }

      var zero = yScale(Math.max(min, 0))
      this.coords = []
      this.coords = [0, zero]

      for (var i = 0; i < values.length; i++) {
        this.coords.push(
          xScale(i),
          yScale(values[i])
        )
      }

      this.coords.push(width, zero)
    }
  }
}
</script>
