// 主要JavaScript交互功能
(function() {
    'use strict';

    // 工具函数
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);
    const addClass = (element, className) => element.classList.add(className);
    const removeClass = (element, className) => element.classList.remove(className);
    const toggleClass = (element, className) => element.classList.toggle(className);

    // DOM加载完成后初始化
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initScrollEffects();
        initAnimations();
        initTheme();
        initSearch();
        initModals();
    });

    // 导航功能
    function initNavigation() {
        const navToggle = $('.nav-toggle');
        const navList = $('.nav-list');
        const navLinks = $$('.nav-link');

        if (!navToggle || !navList) return;

        // 移动端导航切换
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';

            toggleClass(navList, 'active');
            navToggle.setAttribute('aria-expanded', !isExpanded);

            // 添加动画效果
            if (!isExpanded) {
                navList.style.animation = 'slideInLeft 0.3s ease-out';
            }
        });

        // 点击导航链接后关闭移动端菜单
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                removeClass(navList, 'active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // 点击外部关闭导航菜单
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navList.contains(event.target)) {
                removeClass(navList, 'active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // 高亮当前页面
        const currentPath = window.location.pathname;
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath.split('/').pop()) {
                addClass(link, 'active');
            } else {
                removeClass(link, 'active');
            }
        });
    }

    // 滚动效果
    function initScrollEffects() {
        const header = $('.site-header');
        if (!header) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        function updateHeader() {
            const scrollY = window.scrollY;

            if (scrollY > 100) {
                addClass(header, 'scrolled');
            } else {
                removeClass(header, 'scrolled');
            }

            lastScrollY = scrollY;
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick);

        // 平滑滚动到锚点
        const anchorLinks = $$('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = $(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // 动画效果
    function initAnimations() {
        // 检查是否支持Intersection Observer
        if (!window.IntersectionObserver) {
            // 降级处理 - 立即显示所有元素
            $$('.fade-in-up, .slide-in-left').forEach(element => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) translateX(0)';
            });
            return;
        }

        // 创建观察器
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 添加动画类
                    if (entry.target.classList.contains('fade-in-up')) {
                        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    } else if (entry.target.classList.contains('slide-in-left')) {
                        entry.target.style.animation = 'slideInLeft 0.6s ease-out forwards';
                    }

                    // 动画完成后停止观察
                    setTimeout(() => {
                        observer.unobserve(entry.target);
                    }, 600);
                }
            });
        }, observerOptions);

        // 观察需要动画的元素
        const animatedElements = $$('.post-card, .about-content, .hero-content');
        animatedElements.forEach(element => {
            // 根据元素类型添加相应的类
            if (element.classList.contains('post-card')) {
                addClass(element, 'fade-in-up');
            } else {
                addClass(element, 'slide-in-left');
            }

            // 初始状态
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';

            // 开始观察
            observer.observe(element);
        });
    }

    // 主题切换（深色模式支持）
    function initTheme() {
        // 检查用户偏好的主题
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const themeToggle = $('.theme-toggle');

        // 如果有主题切换按钮，添加切换功能
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                document.documentElement.classList.toggle('dark-theme');
                localStorage.setItem('theme',
                    document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light'
                );
            });
        }

        // 监听系统主题变化
        prefersDarkScheme.addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                document.documentElement.classList.toggle('dark-theme', e.matches);
            }
        });
    }

    // 搜索功能
    function initSearch() {
        const searchInput = $('.search-input');
        const searchResults = $('.search-results');

        if (!searchInput) return;

        let searchTimeout;

        searchInput.addEventListener('input', function() {
            const query = this.value.trim();

            // 防抖处理
            clearTimeout(searchTimeout);

            if (query.length < 2) {
                hideSearchResults();
                return;
            }

            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });

        // 点击外部关闭搜索结果
        document.addEventListener('click', function(event) {
            if (!searchInput.contains(event.target) &&
                (!searchResults || !searchResults.contains(event.target))) {
                hideSearchResults();
            }
        });

        function performSearch(query) {
            // 这里可以实现实际的搜索逻辑
            // 暂时显示模拟结果
            showSearchResults([
                { title: '搜索结果 1', excerpt: '关于 ' + query + ' 的相关内容...' },
                { title: '搜索结果 2', excerpt: '更多关于 ' + query + ' 的信息...' }
            ]);
        }

        function showSearchResults(results) {
            if (!searchResults) return;

            searchResults.innerHTML = results.map(result => `
                <div class="search-result-item">
                    <h4 class="search-result-title">${result.title}</h4>
                    <p class="search-result-excerpt">${result.excerpt}</p>
                </div>
            `).join('');

            addClass(searchResults, 'show');
        }

        function hideSearchResults() {
            if (searchResults) {
                removeClass(searchResults, 'show');
            }
        }
    }

    // 模态框功能
    function initModals() {
        const modalTriggers = $$('[data-modal-trigger]');
        const modalOverlays = $$('.modal-overlay');
        const closeButtons = $$('[data-modal-close]');

        // 打开模态框
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                const modalId = this.getAttribute('data-modal-trigger');
                const modal = $(modalId);
                if (modal) {
                    openModal(modal);
                }
            });
        });

        // 关闭模态框
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal-overlay');
                if (modal) {
                    closeModal(modal);
                }
            });
        });

        // 点击背景关闭模态框
        modalOverlays.forEach(overlay => {
            overlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal(this);
                }
            });
        });

        // ESC键关闭模态框
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const openModal = $('.modal-overlay.active');
                if (openModal) {
                    closeModal(openModal);
                }
            }
        });
    }

    function openModal(modal) {
        addClass(modal, 'active');
        document.body.style.overflow = 'hidden';

        // 焦点管理
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }

    function closeModal(modal) {
        removeClass(modal, 'active');
        document.body.style.overflow = '';
    }

    // 通知系统
    function showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <p class="notification-message">${message}</p>
                <button class="notification-close" aria-label="关闭通知">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // 显示动画
        setTimeout(() => addClass(notification, 'show'), 100);

        // 关闭功能
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => hideNotification(notification));

        // 自动关闭
        setTimeout(() => hideNotification(notification), duration);
    }

    function hideNotification(notification) {
        removeClass(notification, 'show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // 图片懒加载
    function initLazyLoading() {
        if (!window.IntersectionObserver) return;

        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = $$('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // 性能监控
    function initPerformanceMonitoring() {
        // 监控页面加载时间
        window.addEventListener('load', function() {
            if (window.performance && window.performance.timing) {
                const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
                console.log(`页面加载时间: ${loadTime}ms`);
            }
        });

        // 监控长任务
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver(function(list) {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 50) {
                        console.warn(`检测到长任务: ${entry.duration}ms`, entry);
                    }
                }
            });

            try {
                observer.observe({ entryTypes: ['longtask'] });
            } catch (e) {
                // 某些浏览器可能不支持
            }
        }
    }

    // 工具函数 - 防抖
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 工具函数 - 节流
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // 暴露一些全局函数供其他脚本使用
    window.BlogUtils = {
        showNotification,
        debounce,
        throttle
    };

    // 初始化其他功能
    initLazyLoading();
    initPerformanceMonitoring();

})();