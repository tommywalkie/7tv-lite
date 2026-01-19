export function injectUmamiScript() {
  const script = document.createElement('script')
  script.src = 'https://umami.tommywalkie.com/script.js'
  script.setAttribute('data-website-id', 'cf9e09ba-22f2-4b75-9670-c0236efc013b')
  script.defer = true
  document.head.appendChild(script)
}
