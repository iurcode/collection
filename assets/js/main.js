window.addEventListener('load', () => setTimeout(() => document.querySelector('.spinner-overlay').classList.add('hidden'), 500));

/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('menu');
const navToggle = document.getElementById('nav-open');
const navClose = document.getElementById('nav-close');

if(navToggle) navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));

if(navClose) navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.menu__link')

navLink.forEach(elem => elem.addEventListener('click', () => navMenu.classList.remove('show-menu')));

/*==================== ABOUT TABS ====================*/
const tabs = document.querySelectorAll('[data-target]');
const tabContent = document.querySelectorAll('[data-content]');

tabs.forEach(tab => tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target);

    tabContent.forEach(content => content.classList.remove('about__active'));

    target.classList.add('about__active');

    tabs.forEach(tab => tab.classList.remove('about__active'));

    tab.classList.add('about__active');
}));

/*==================== ABOUT MODAL ====================*/
const modalViews = document.querySelectorAll('.modal');
const modalBtns = document.querySelectorAll('.modal-btn');
const modalCloses = document.querySelectorAll('.modal__close');

modalBtns.forEach((item, index) => item.addEventListener('click', () => modalViews[index].classList.add('active-modal')));

modalCloses.forEach((item) => item.addEventListener('click', () => modalViews.forEach(modal => modal.classList.remove('active-modal'))))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.menu a[href*=' + sectionId + ']').classList.add('menu__link--active')
        }else{
            document.querySelector('.menu a[href*=' + sectionId + ']').classList.remove('menu__link--active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 80 ? nav.classList.add('scroll-header') : nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scrollup');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the tag with the scroll-top class
    (this.scrollY >= 560) ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-toggle')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

// Create Collection Table
import {collection} from ('./collection.js');

const collectionContainer = document.querySelector('.collection__container');
const wantlistContainer = document.querySelector('.wantlist__container');

for(let item of collection) {
    let tHead = '';
    let outputWantlist = '';
    let outputCollection = '';
    let bodyWantlist = '';
    let bodyCollection = '';
    let countInCollection = 0;
    let countInWantlist = 0;

    if (item.releases) {
        for(let release of item.releases) {
            if(!release.inCollection) {
                bodyWantlist += `
                <tr class="collection__body-tr">
                    <td class="collection-img"><img src="assets/img/thumbs/${release.thumbName}" alt="${item.name}"></td>
                    <td class="collection-name">${release.format}</td>
                    <td class="collection-country">${release.country}</td>
                    <td class="collection-upc">${release.upc}</td>
                    <td class="collection-catalog">${release.catNumber}</td>
                    <td class="collection-status">In wantlist</td>
                </tr>`;
                countInWantlist++
            }
            
            bodyCollection += `
            <tr class="collection__body-tr">
                <td class="collection-img"><img src="assets/img/thumbs/${release.thumbName}" alt="${item.name}"></td>
                <td class="collection-name">${release.format}</td>
                <td class="collection-country">${release.country}</td>
                <td class="collection-upc">${release.upc}</td>
                <td class="collection-catalog">${release.catNumber}</td>
                <td class="collection-status">
                    ${release.inCollection ? '<span class="collectedStatus">In collection</span>' : '<span class="wantedStatus">In wantlist</span>'}
                </td>
            </tr>`;
            countInCollection++
        }

        tHead = `<thead>
                    <tr class="collection__head-tr">
                        <th class="collection-img"></th>
                        <th class="collection-name">Name</th>
                        <th class="collection-country">Country</th>
                        <th class="collection-upc">UPC</th>
                        <th class="collection-catalog">Catalog №</th>
                        <th class="collection-status">Status</th>
                    </tr>
                </thead>`;

        outputCollection = `
                <div class="collection__list">
                    <table class="collection__table">
                        ${tHead}
                        <tbody>${bodyCollection}
                        </tbody>
                    </table>
                </div>
            `;

        outputWantlist = `
            <div class="collection__list">
                <table class="collection__table">
                    ${tHead}
                    <tbody>${bodyWantlist}
                    </tbody>
                </table>
            </div>
        `;
    }

    const collectionContant = document.createElement('div');
    const wantlistContant = document.createElement('div');

    createOutput(collectionContant, outputCollection, collectionContainer, countInCollection)
    createOutput(wantlistContant, outputWantlist, wantlistContainer, countInWantlist)

    function createOutput(nodeDiv, output, container, count) {
        if(!count) return;
        
        nodeDiv.classList.add('collection__content', 'collection__close');
        const divHeader = document.createElement('div');
        divHeader.classList.add('collection__header');
        divHeader.addEventListener('click', function() {
            if(this.parentNode.classList.contains('collection__close')) {
                this.parentNode.classList.add('collection__open');
                this.parentNode.classList.remove('collection__close');
            } else {
                this.parentNode.classList.remove('collection__open');
                this.parentNode.classList.add('collection__close');     
            }
        });
        divHeader.insertAdjacentHTML('beforeend', `
            <h1 class="collection__title">${item.year} - ${item.name} (${count} items)</h1>
            <i class="uil uil-angle-down collection__arrow"></i>
            `
        )
    
        nodeDiv.appendChild(divHeader);
        nodeDiv.insertAdjacentHTML('beforeend', output);
    
        container.appendChild(nodeDiv)
    }
}


// const thHead = document.querySelectorAll('.collection__tr--head > th')
// const trsBody = document.querySelectorAll('.collection__tr--body')

// let result = '{\n"name": "One Step Closer",\n"type": "single",\n"releases": [\n'
// let j = 1;
// for(let tr of trsBody) {
//     const tds = tr.querySelectorAll('td')
    
//     result = result + `{\n"id": "${j}",\n`

//     for(let i = 0; i < tds.length; i++) {
//         result = result + ('"' + thHead[i].innerHTML.toLocaleLowerCase() + '": "' + tds[i].innerHTML +'",\n');
        
//     }

//     result = result + "},\n"

//     j++
// }

// result = result + "]"

// console.log(result)
