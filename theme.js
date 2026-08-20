const themeChange = document.querySelector('.theme-changer')

themeChange.addEventListener('click', function() {
    document.body.classList.toggle('dark')
    if(document.body.classList.contains('dark')) {
        themeChange.innerHTML ='<i class="fa-solid fa-sun"></i> Light Mode'
        localStorage.setItem("theme", "dark");
    } else {
        themeChange.innerHTML ='<i class="fa-regular fa-moon"></i> Dark Mode'
        localStorage.setItem("theme", "light")
    }
})

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeChange.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
} else {
  document.body.classList.remove("dark");
  themeChange.innerHTML = '<i class="fa-regular fa-moon"></i> Dark Mode';
}