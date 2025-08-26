document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenuClose && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';

            const contactBlock = document.querySelector('.header-contact-block');
            if (contactBlock) {
                contactBlock.style.display = 'block';
            }
        });

        mobileMenuClose.addEventListener('click', function () {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });

        mobileMenu.addEventListener('click', function (e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    function initializeSliders() {
        if (!window.Splide) return;

        const sliderConfigs = {
            '.doctors__slider.splide': {
                perPage: 4,
                gap: '24px',
                pagination: true,
                arrows: true,
                breakpoints: {
                    1425: { perPage: 3, gap: '20px' },
                    1024: { perPage: 2, gap: '16px' },
                    768: { perPage: 1, gap: '12px' }
                }
            },
            '.gallery__slider.splide': {
                perPage: 4,
                gap: '24px',
                pagination: true,
                arrows: true,
                breakpoints: {
                    1400: { perPage: 3, gap: '20px' },
                    1024: { perPage: 2, gap: '16px' },
                    768: { perPage: 1, gap: '12px' }
                }
            },
            '.reviews__slider.splide': {
                perPage: 3,
                gap: '24px',
                pagination: true,
                arrows: true,
                breakpoints: {
                    1400: { perPage: 2, gap: '20px' },
                    1024: { perPage: 2, gap: '16px' },
                    768: { perPage: 1, gap: '12px' }
                }
            },
            '.promotions__slider.splide': {
                perPage: 3,
                gap: '32px',
                pagination: true,
                arrows: true,
                breakpoints: {
                    1124: { perPage: 2, gap: '24px' },
                    768: { perPage: 1, gap: '16px' },
                    640: { perPage: 1, gap: '24px' }
                }
            },
            '.useful-info__slider.splide': {
                perPage: 3,
                gap: '32px',
                pagination: true,
                arrows: true,
                breakpoints: {
                    1124: { perPage: 2, gap: '24px' },
                    768: { perPage: 1, gap: '16px' },
                    640: { perPage: 1, gap: '24px' }
                }
            },
            '.ratings__slider.splide': {
                perPage: 3,
                gap: '32px',
                pagination: true,
                arrows: true,
                breakpoints: {
                    1024: { perPage: 2, gap: '24px' },
                    768: { perPage: 1, gap: '16px' },
                    640: { perPage: 1, gap: '24px' }
                }
            },
            '.licenses__slider.splide': {
                perPage: 3,
                gap: '32px',
                pagination: false,
                arrows: false,
                breakpoints: {
                    1024: { perPage: 2, gap: '24px' },
                    768: { perPage: 1, gap: '16px' },
                    640: { perPage: 1, gap: '24px' }
                }
            },

        };

        Object.entries(sliderConfigs).forEach(([selector, config]) => {
            const sliderElement = document.querySelector(selector);
            if (sliderElement) {
                const splide = new Splide(sliderElement, {
                    type: 'slide',
                    perMove: 1,
                    focus: 0,
                    omitEnd: true,
                    width: '100%',
                    fixedWidth: false,
                    autoWidth: false,
                    ...config
                });

                if (selector === '.licenses__slider.splide') {
                    const bar = splide.root.querySelector('.my-carousel-progress-bar');
                    splide.on('mounted move', function () {
                        const end = splide.Components.Controller.getEnd() + 1;
                        const rate = Math.min((splide.index + 1) / end, 1);
                        if (bar) {
                            bar.style.width = String(100 * rate) + '%';
                        }
                    });
                }

                splide.mount();
            }
        });
    }

    function initializeMapModal() {
        const openMapBtn = document.getElementById('openMapBtn');
        const mapModal = document.getElementById('mapModal');
        const closeMapBtn = document.getElementById('closeMapBtn');
        const mapOverlay = document.getElementById('mapOverlay');

        if (openMapBtn && mapModal && closeMapBtn && mapOverlay) {
            openMapBtn.addEventListener('click', function () {
                mapModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            closeMapBtn.addEventListener('click', function () {
                mapModal.classList.remove('active');
                document.body.style.overflow = '';
            });

            mapOverlay.addEventListener('click', function (e) {
                if (e.target === mapOverlay) {
                    mapModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });

            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && mapModal.classList.contains('active')) {
                    mapModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    function initializeTabs() {

        const clinicTabs = document.querySelectorAll('.clinic-services__tab');
        const clinicTabContents = document.querySelectorAll('.clinic-services__tab-content');

        clinicTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const targetTab = this.getAttribute('data-tab');

                clinicTabs.forEach(t => t.classList.remove('clinic-services__tab--active'));
                this.classList.add('clinic-services__tab--active');

                this.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });

                clinicTabContents.forEach(content => {
                    content.style.display = 'none';
                });

                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.style.display = 'block';
                }
            });
        });

        const directionTabs = document.querySelectorAll('.direction-nav__tab');
        const directionTabContents = document.querySelectorAll('.direction-tab-content');

        directionTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const targetTab = this.getAttribute('data-tab');

                directionTabs.forEach(t => t.classList.remove('direction-nav__tab--active'));
                this.classList.add('direction-nav__tab--active');

                directionTabContents.forEach(content => {
                    content.classList.remove('direction-tab-content--active');
                });

                const targetContent = document.querySelector(`.direction-tab-content[data-tab="${targetTab}"]`);

                if (targetContent) {
                    targetContent.classList.add('direction-tab-content--active');
                }
            });
        });

        const serviceTabs = document.querySelectorAll('.direction-services-tab');
        const serviceTabContents = document.querySelectorAll('.direction-services-tab-content');

        serviceTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const targetServiceTab = this.getAttribute('data-service-tab');

                serviceTabs.forEach(t => t.classList.remove('direction-services-tab--active'));
                this.classList.add('direction-services-tab--active');

                serviceTabContents.forEach(content => {
                    content.classList.remove('direction-services-tab-content--active');
                });

                const targetServiceContent = document.querySelector(`.direction-services-tab-content[data-service-tab="${targetServiceTab}"]`);

                if (targetServiceContent) {
                    targetServiceContent.classList.add('direction-services-tab-content--active');
                }

                const showAllButton = document.getElementById('showAllServices');
                if (showAllButton) {
                    const buttonText = showAllButton.querySelector('span');
                    if (buttonText) {
                        buttonText.textContent = 'Показать все';
                    }
                    showAllButton.classList.remove('direction-services-show-all--active');

                    const allServiceGrids = document.querySelectorAll('.direction-services-grid');
                    allServiceGrids.forEach(grid => {
                        const hiddenColumn = grid.querySelector('.direction-services-column:nth-child(2)');
                        if (hiddenColumn) {
                            hiddenColumn.classList.remove('show');
                            hiddenColumn.style.display = 'none';
                        }
                    });
                }
            });
        });

        const showAllButton = document.getElementById('showAllServices');
        if (showAllButton) {
            showAllButton.addEventListener('click', function () {
                const servicesContent = this.closest('.direction-services');
                const activeTabContent = servicesContent.querySelector('.direction-services-tab-content--active');
                const servicesGrid = activeTabContent.querySelector('.direction-services-grid');
                const buttonText = this.querySelector('span') || this;

                if (servicesGrid) {
                    const hiddenColumn = servicesGrid.querySelector('.direction-services-column:nth-child(2)');
                    const isExpanded = this.classList.contains('direction-services-show-all--active');

                    if (hiddenColumn && !isExpanded) {
                        hiddenColumn.style.display = 'block';
                        setTimeout(() => {
                            hiddenColumn.classList.add('show');
                        }, 10);
                        buttonText.textContent = 'Скрыть';
                        this.classList.add('direction-services-show-all--active');
                    } else if (hiddenColumn && isExpanded) {
                        hiddenColumn.classList.remove('show');
                        setTimeout(() => {
                            hiddenColumn.style.display = 'none';
                        }, 300);
                        buttonText.textContent = 'Показать все';
                        this.classList.remove('direction-services-show-all--active');
                    }
                }
            });
        }
    }

    function initializeIllnessesShowAll() {
        const showAllIllnessesButton = document.getElementById('showAllIllnesses');
        if (showAllIllnessesButton) {
            showAllIllnessesButton.addEventListener('click', function () {
                const illnessesGrid = this.closest('.direction-illnesses').querySelector('.direction-illnesses__grid');
                const hiddenColumn = illnessesGrid.querySelector('.direction-illnesses__column:nth-child(2)');
                const buttonText = this.querySelector('span') || this;
                const isExpanded = this.classList.contains('direction-illnesses__show-all--active');

                if (hiddenColumn && !isExpanded) {
                    hiddenColumn.style.display = 'block';
                    setTimeout(() => {
                        hiddenColumn.classList.add('show');
                    }, 10);
                    buttonText.textContent = 'Скрыть';
                    this.classList.add('direction-illnesses__show-all--active');
                } else if (hiddenColumn && isExpanded) {
                    hiddenColumn.classList.remove('show');
                    setTimeout(() => {
                        hiddenColumn.style.display = 'none';
                    }, 300);
                    buttonText.textContent = 'Показать все';
                    this.classList.remove('direction-illnesses__show-all--active');
                }
            });
        }
    }

    function initializeShowMoreButtons() {
        const showMoreButtons = document.querySelectorAll('.clinic-services__search-btn--mobile');

        showMoreButtons.forEach(button => {
            button.addEventListener('click', function () {
                const tabContent = this.closest('.clinic-services__tab-content');
                if (!tabContent) return;

                const servicesList = tabContent.querySelector('.clinic-services__list');
                if (!servicesList) return;

                const allColumns = servicesList.querySelectorAll('.clinic-services__column');
                const hiddenColumns = Array.from(allColumns).slice(1);
                const buttonText = this.querySelector('.clinic-services__search-text');

                const isExpanded = hiddenColumns.length > 0 && hiddenColumns[0].classList.contains('show');

                if (isExpanded) {
                    hiddenColumns.forEach(column => {
                        column.classList.remove('show');
                        setTimeout(() => {
                            if (!column.classList.contains('show')) {
                                column.style.display = 'none';
                            }
                        }, 300);
                    });
                    buttonText.textContent = 'Показать еще';
                } else {
                    hiddenColumns.forEach(column => {
                        column.style.display = 'block';
                        setTimeout(() => {
                            column.classList.add('show');
                        }, 10);
                    });
                    buttonText.textContent = 'Скрыть';
                }
            });
        });
    }

    function initializeDropdowns() {
        const dropdowns = document.querySelectorAll('.header__dropdown');

        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('toggle', function () {
                if (this.open) {
                    dropdowns.forEach(other => {
                        if (other !== this && other.open) {
                            other.open = false;
                        }
                    });
                }
            });
        });

        document.addEventListener('click', function (event) {
            if (!event.target.closest('.header__dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.open = false;
                });
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                dropdowns.forEach(dropdown => {
                    dropdown.open = false;
                });
            }
        });
    }

    function initializeMegaMenu() {
        const megaMenuTabs = document.querySelectorAll('.header__mega-menu-tab');
        megaMenuTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                megaMenuTabs.forEach(t => t.classList.remove('header__mega-menu-tab--active'));
                this.classList.add('header__mega-menu-tab--active');
            });
        });
    }

    function initializeHeroSlider() {
        const slides = document.querySelectorAll('.hero__slide');
        const dots = document.querySelectorAll('.hero__carousel-dot');
        const leftArrow = document.querySelector('.hero__carousel-arrow--left');
        const rightArrow = document.querySelector('.hero__carousel-arrow--right');
        const heroContainer = document.querySelector('.hero__container');

        let currentSlide = 0;

        function updateSlide(index) {
            slides.forEach(slide => slide.classList.remove('hero__slide--active'));
            dots.forEach(dot => dot.classList.remove('hero__carousel-dot--active'));

            slides[index].classList.add('hero__slide--active');
            dots[index].classList.add('hero__carousel-dot--active');

            const newBg = slides[index].getAttribute('data-bg');
            if (heroContainer && newBg) {
                heroContainer.style.background = newBg;
            }

            currentSlide = index;
        }

        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            updateSlide(next);
        }

        function prevSlide() {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            updateSlide(prev);
        }

        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                prevSlide();
            });
        }

        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                nextSlide();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateSlide(index);
            });
        });
    }

    function initializeReadMoreButton() {
        const readMoreBtn = document.getElementById('read-more-btn');
        const additionalText = document.getElementById('additional-text');

        if (readMoreBtn && additionalText) {
            readMoreBtn.addEventListener('click', function () {
                if (additionalText.style.display === "none" || additionalText.style.display === "") {
                    additionalText.style.display = "block";
                    readMoreBtn.textContent = "Скрыть";
                } else {
                    additionalText.style.display = "none";
                    readMoreBtn.textContent = "Читать больше";
                }
            });
        }
    }

    function initializeReadMoreButtonMobile() {
        const readMoreBtnMobile = document.getElementById('read-more-btn-mobile');
        const additionalTextMobile = document.getElementById('additional-text-mobile');

        if (readMoreBtnMobile && additionalTextMobile) {
            readMoreBtnMobile.addEventListener('click', function () {
                if (additionalTextMobile.style.display === "none" || additionalTextMobile.style.display === "") {
                    additionalTextMobile.style.display = "block";
                    readMoreBtnMobile.textContent = "Скрыть";
                } else {
                    additionalTextMobile.style.display = "none";
                    readMoreBtnMobile.textContent = "Читать больше";
                }
            });
        }
    }

    function initializeCustomSelects() {
        const customSelects = document.querySelectorAll('.custom-select');

        customSelects.forEach(select => {
            const header = select.querySelector('.custom-select__header');
            const input = select.querySelector('.custom-select__input');
            const options = select.querySelectorAll('.custom-select__option');
            const searchInput = select.querySelector('.custom-select__search-input');

            if (header) {
                header.addEventListener('click', function (e) {
                    e.stopPropagation();
                    select.classList.toggle('active');
                });
            }

            options.forEach(option => {
                option.addEventListener('click', function () {
                    const value = this.getAttribute('data-value');
                    const text = this.textContent;

                    options.forEach(opt => opt.classList.remove('selected'));
                    this.classList.add('selected');

                    if (input) {
                        input.value = text;
                    }

                    select.classList.remove('active');
                });
            });

            if (searchInput) {
                searchInput.addEventListener('input', function () {
                    const searchTerm = this.value.toLowerCase();

                    options.forEach(option => {
                        const text = option.textContent.toLowerCase();
                        if (text.includes(searchTerm)) {
                            option.style.display = 'block';
                        } else {
                            option.style.display = 'none';
                        }
                    });
                });
            }

            document.addEventListener('click', function (e) {
                if (!select.contains(e.target)) {
                    select.classList.remove('active');
                }
            });
        });
    }

    function initializeEducationAccordion() {
        const educationHeaders = document.querySelectorAll('#educationHeader');
        const educationBodies = document.querySelectorAll('#educationBody');
        const educationToggles = document.querySelectorAll('#educationToggle');

        educationHeaders.forEach((header, index) => {
            const body = educationBodies[index];
            const toggle = educationToggles[index];

            if (header && body && toggle) {
                header.addEventListener('click', function () {
                    body.classList.toggle('active');
                    toggle.classList.toggle('active');
                });

                toggle.addEventListener('click', function (e) {
                    e.stopPropagation();
                    body.classList.toggle('active');
                    toggle.classList.toggle('active');
                });
            }
        });
    }

    initializeTabs();
    initializeShowMoreButtons();
    initializeDropdowns();
    initializeMegaMenu();
    initializeHeroSlider();
    initializeSliders();
    initializeMapModal();
    initializeReadMoreButton();
    initializeReadMoreButtonMobile();
    initializeCustomSelects();
    initializeEducationAccordion();
    initializeIllnessesShowAll();
});