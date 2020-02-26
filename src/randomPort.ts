/**
 * 根据 wiki https://en.wikipedia.org/wiki/Ephemeral_port 推荐，我们采用 49152 to 65535
 */

const MIN = 49152;
const MAX = 65535;

export default function randomPort() {
  // include MIN, exclude MAX
  return Math.floor(Math.random() * (MAX - MIN)) + MIN;
}
