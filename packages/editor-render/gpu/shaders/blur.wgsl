struct VertexOutput {
  @builtin(position) Position : vec4<f32>,
  @location(0) fragUV : vec2<f32>,
};

@group(0) @binding(0) var samp : sampler;
@group(0) @binding(1) var tex : texture_2d<f32>;

@fragment
fn main(input: VertexOutput) -> @location(0) vec4<f32> {
  let offsets = array<vec2<f32>, 9>(
    vec2<f32>(-1.0, -1.0),
    vec2<f32>( 0.0, -1.0),
    vec2<f32>( 1.0, -1.0),
    vec2<f32>(-1.0,  0.0),
    vec2<f32>( 0.0,  0.0),
    vec2<f32>( 1.0,  0.0),
    vec2<f32>(-1.0,  1.0),
    vec2<f32>( 0.0,  1.0),
    vec2<f32>( 1.0,  1.0)
  );

  let kernel = array<f32, 9>(
    1.0/16.0, 2.0/16.0, 1.0/16.0,
    2.0/16.0, 4.0/16.0, 2.0/16.0,
    1.0/16.0, 2.0/16.0, 1.0/16.0
  );

  var color = vec4<f32>(0.0);
  let texSize = vec2<f32>(textureDimensions(tex, 0));
  let uv = input.fragUV;

  for (var i = 0u; i < 9u; i = i + 1u) {
    let offset = offsets[i] / texSize;
    color = color + textureSample(tex, samp, uv + offset) * kernel[i];
  }

  return color;
}
