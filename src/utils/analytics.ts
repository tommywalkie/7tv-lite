export function injectRybbitScript() {
  const script = document.createElement('script')
  script.src = 'https://rybbit.tommywalkie.com/api/script.js'
  script.setAttribute('data-site-id', 'd9982f4516af')
  script.defer = true
  document.head.appendChild(script)
}
