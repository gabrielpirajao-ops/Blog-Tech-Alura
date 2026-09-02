/* =========================================================
   TECHZONE - SCRIPT.JS
   Blog de Tecnologia
   ========================================================= */


/* =========================================================
   1. ELEMENTOS DO HTML
   ========================================================= */

const body = document.body;

const themeButton =
    document.getElementById("themeButton");

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const postsGrid =
    document.getElementById("postsGrid");

const loadMoreButton =
    document.getElementById("loadMore");

const newsletterForm =
    document.getElementById("newsletterForm");

const emailInput =
    document.getElementById("emailInput");


/* =========================================================
   2. TEMA CLARO / ESCURO
   ========================================================= */

function loadTheme() {

    const savedTheme =
        localStorage.getItem("techzone-theme");

    if (savedTheme === "light") {

        body.classList.add("light-mode");

        if (themeButton) {
            themeButton.textContent = "☀️";
        }

    } else {

        body.classList.remove("light-mode");

        if (themeButton) {
            themeButton.textContent = "🌙";
        }
    }
}


function toggleTheme() {

    body.classList.toggle("light-mode");

    const isLight =
        body.classList.contains("light-mode");


    if (isLight) {

        if (themeButton) {
            themeButton.textContent = "☀️";
        }

        localStorage.setItem(
            "techzone-theme",
            "light"
        );

    } else {

        if (themeButton) {
            themeButton.textContent = "🌙";
        }

        localStorage.setItem(
            "techzone-theme",
            "dark"
        );
    }
}


if (themeButton) {

    themeButton.addEventListener(
        "click",
        toggleTheme
    );
}


loadTheme();


/* =========================================================
   3. SISTEMA DE LIKES
   ========================================================= */

function setupLikes() {

    const likeButtons =
        document.querySelectorAll(
            ".like-button"
        );


    likeButtons.forEach(
        (button, index) => {

            const post =
                button.closest(".post-card");


            if (!post) {
                return;
            }


            let postId =
                post.dataset.id;


            if (!postId) {

                postId =
                    `post-${index + 1}`;

                post.dataset.id =
                    postId;
            }


            let likes =
                Number(
                    button.dataset.likes || 0
                );


            const storageKey =
                `techzone-liked-${postId}`;


            const alreadyLiked =
                localStorage.getItem(
                    storageKey
                ) === "true";


            if (alreadyLiked) {

                button.classList.add(
                    "liked"
                );

                button.innerHTML =
                    `💖 <span>${likes}</span>`;
            }


            button.onclick =
                () => {

                    const isLiked =
                        button.classList.contains(
                            "liked"
                        );


                    if (!isLiked) {

                        likes++;

                        button.classList.add(
                            "liked"
                        );

                        button.innerHTML =
                            `💖 <span>${likes}</span>`;

                        localStorage.setItem(
                            storageKey,
                            "true"
                        );


                        showNotification(
                            "Post curtido! ❤️"
                        );

                    } else {

                        likes--;

                        button.classList.remove(
                            "liked"
                        );

                        button.innerHTML =
                            `❤️ <span>${likes}</span>`;

                        localStorage.setItem(
                            storageKey,
                            "false"
                        );
                    }
                };
        }
    );
}


setupLikes();


/* =========================================================
   4. BUSCA DE POSTS
   ========================================================= */

function searchPosts() {

    if (!searchInput) {
        return;
    }


    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    const posts =
        document.querySelectorAll(
            ".post-card"
        );


    let results = 0;


    posts.forEach(post => {

        const title =
            (
                post.dataset.title || ""
            ).toLowerCase();


        const category =
            (
                post.dataset.category || ""
            ).toLowerCase();


        const content =
            post.textContent.toLowerCase();


        const found =
            searchTerm === "" ||
            title.includes(searchTerm) ||
            category.includes(searchTerm) ||
            content.includes(searchTerm);


        if (found) {

            post.style.display = "";

            results++;

        } else {

            post.style.display = "none";
        }
    });


    if (searchTerm === "") {

        return;
    }


    if (results === 0) {

        showNotification(
            "Nenhum post encontrado. 😕"
        );

    } else {

        showNotification(
            `${results} post(s) encontrado(s).`
        );
    }
}


if (searchButton) {

    searchButton.addEventListener(
        "click",
        searchPosts
    );
}


if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                searchPosts();
            }
        }
    );


    searchInput.addEventListener(
        "input",
        () => {

            if (
                searchInput.value.trim() === ""
            ) {

                const posts =
                    document.querySelectorAll(
                        ".post-card"
                    );


                posts.forEach(post => {

                    post.style.display = "";
                });
            }
        }
    );
}


/* =========================================================
   5. BOTÕES DE COMPARTILHAMENTO
   ========================================================= */

function setupShareButtons() {

    const shareButtons =
        document.querySelectorAll(
            ".share-button"
        );


    shareButtons.forEach(button => {

        button.onclick =
            async () => {

                const card =
                    button.closest(
                        ".post-card"
                    );


                const title =
                    card?.querySelector("h3")
                        ?.textContent
                        .trim() ||
                    "Post do TechZone";


                const shareData = {

                    title: title,

                    text:
                        "Confira este post do TechZone!",

                    url:
                        window.location.href
                };


                try {

                    if (
                        navigator.share
                    ) {

                        await navigator.share(
                            shareData
                        );

                    } else {

                        await navigator.clipboard
                            .writeText(
                                window.location.href
                            );


                        showNotification(
                            "Link copiado! 🔗"
                        );
                    }

                } catch (error) {

                    if (
                        error.name !==
                        "AbortError"
                    ) {

                        showNotification(
                            "Não foi possível compartilhar."
                        );
                    }
                }
            };
    });
}


setupShareButtons();


/* =========================================================
   6. COMENTÁRIOS
   ========================================================= */

function setupCommentButtons() {

    const buttons =
        document.querySelectorAll(
            ".comment-button"
        );


    buttons.forEach(button => {

        button.onclick =
            () => {

                showNotification(
                    "Sistema de comentários em breve! 💬"
                );
            };
    });
}


setupCommentButtons();


/* =========================================================
   7. POSTS EXTRAS
   ========================================================= */

const extraPosts = [

    {
        id: "post-5",

        category: "Hardware",

        title:
            "SSD NVMe: vale a pena trocar seu HD?",

        description:
            "Entenda as diferenças entre HD, SSD SATA e SSD NVMe e descubra onde está o maior ganho de desempenho.",

        author:
            "Gabriel Souza",

        initials:
            "GS",

        date:
            "26 ago. 2026",

        time:
            "5 min",

        likes:
            174,

        comments:
            27,

        emoji:
            "💾",

        color:
            "hardware-image"
    },


    {
        id: "post-6",

        category: "Programação",

        title:
            "Por que aprender lógica de programação?",

        description:
            "Antes de dominar várias linguagens, entender lógica é uma das habilidades mais importantes para um desenvolvedor.",

        author:
            "Ana Martins",

        initials:
            "AM",

        date:
            "24 ago. 2026",

        time:
            "6 min",

        likes:
            291,

        comments:
            44,

        emoji:
            "🧠",

        color:
            "javascript-image"
    },


    {
        id: "post-7",

        category: "Games",

        title:
            "O que faz uma placa de vídeo ser boa para jogos?",

        description:
            "GPU, VRAM, resolução, FPS e tecnologias de upscaling: entenda os principais fatores que influenciam sua experiência.",

        author:
            "Pedro Lima",

        initials:
            "PL",

        date:
            "21 ago. 2026",

        time:
            "8 min",

        likes:
            423,

        comments:
            68,

        emoji:
            "🎮",

        color:
            "ai-image"
    }
];


/* =========================================================
   8. CRIAR HTML DE UM POST
   ========================================================= */

function createPost(post) {

    const article =
        document.createElement("article");


    article.className =
        "post-card";


    article.dataset.id =
        post.id;


    article.dataset.category =
        post.category.toLowerCase();


    article.dataset.title =
        post.title.toLowerCase();


    article.innerHTML = `

        <div class="post-image ${post.color}">
            ${post.emoji}
        </div>

        <div class="post-content">

            <span class="post-category">
                ${post.category}
            </span>

            <h3>
                ${post.title}
            </h3>

            <p>
                ${post.description}
            </p>

            <div class="post-author">

                <div class="avatar">
                    ${post.initials}
                </div>

                <div>

                    <strong>
                        ${post.author}
                    </strong>

                    <small>
                        ${post.date} · ${post.time}
                    </small>

                </div>

            </div>

            <div class="post-actions">

                <button
                    class="like-button"
                    data-likes="${post.likes}"
                    aria-label="Curtir publicação"
                >
                    ❤️
                    <span>
                        ${post.likes}
                    </span>
                </button>

                <button class="comment-button">
                    💬
                    <span>
                        ${post.comments}
                    </span>
                </button>

                <button
                    class="share-button"
                    aria-label="Compartilhar publicação"
                >
                    🔗
                </button>

            </div>

        </div>
    `;


    return article;
}


/* =========================================================
   9. CARREGAR MAIS POSTS
   ========================================================= */

let postsLoaded =
    false;


if (loadMoreButton) {

    loadMoreButton.addEventListener(
        "click",
        () => {

            if (postsLoaded) {

                showNotification(
                    "Todos os posts já foram carregados! 🚀"
                );

                return;
            }


            extraPosts.forEach(post => {

                const newPost =
                    createPost(post);


                postsGrid.appendChild(
                    newPost
                );
            });


            postsLoaded =
                true;


            setupLikes();

            setupShareButtons();

            setupCommentButtons();


            loadMoreButton.textContent =
                "Todos os posts carregados";


            loadMoreButton.disabled =
                true;


            showNotification(
                "Novos posts carregados! 🚀"
            );
        }
    );
}


/* =========================================================
   10. NEWSLETTER
   ========================================================= */

if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            if (!emailInput) {
                return;
            }


            const email =
                emailInput.value.trim();


            if (email === "") {

                showNotification(
                    "Digite seu e-mail."
                );

                return;
            }


            if (!isValidEmail(email)) {

                showNotification(
                    "Digite um e-mail válido."
                );

                return;
            }


            localStorage.setItem(
                "techzone-newsletter",
                email
            );


            emailInput.value = "";


            showNotification(
                "Inscrição realizada com sucesso! 🚀"
            );
        }
    );
}


/* =========================================================
   11. VALIDAR E-MAIL
   ========================================================= */

function isValidEmail(email) {

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return regex.test(email);
}


/* =========================================================
   12. NOTIFICAÇÕES
   ========================================================= */

function showNotification(message) {

    const oldNotification =
        document.querySelector(
            ".techzone-notification"
        );


    if (oldNotification) {

        oldNotification.remove();
    }


    const notification =
        document.createElement("div");


    notification.className =
        "techzone-notification";


    notification.textContent =
        message;


    document.body.appendChild(
        notification
    );


    setTimeout(() => {

        notification.classList.add(
            "show"
        );

    }, 10);


    setTimeout(() => {

        notification.classList.remove(
            "show"
        );


        setTimeout(() => {

            notification.remove();

        }, 300);

    }, 3000);
}


/* =========================================================
   13. CSS DA NOTIFICAÇÃO
   ========================================================= */

const notificationStyle =
    document.createElement("style");


notificationStyle.textContent = `

    .techzone-notification {

        position: fixed;

        right: 25px;
        bottom: 25px;

        z-index: 9999;

        max-width: 350px;

        padding: 14px 18px;

        border-radius: 10px;

        border: 1px solid
            rgba(255, 255, 255, 0.1);

        background:
            rgba(17, 24, 39, 0.96);

        color: #f8fafc;

        box-shadow:
            0 15px 40px
            rgba(0, 0, 0, 0.35);

        font-size: 0.9rem;

        font-weight: 600;

        opacity: 0;

        transform:
            translateY(15px);

        pointer-events: none;

        transition:
            opacity 0.3s ease,
            transform 0.3s ease;
    }


    .techzone-notification.show {

        opacity: 1;

        transform:
            translateY(0);
    }


    body.light-mode
    .techzone-notification {

        background: #ffffff;

        color: #0f172a;

        border-color:
            rgba(15, 23, 42, 0.1);
    }


    @media (max-width: 600px) {

        .techzone-notification {

            right: 14px;
            left: 14px;
            bottom: 14px;

            max-width: none;

            text-align: center;
        }
    }

`;


document.head.appendChild(
    notificationStyle
);


/* =========================================================
   14. NAVEGAÇÃO SUAVE
   ========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;
            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    );
});


/* =========================================================
   15. ANIMAÇÃO DOS POSTS
   ========================================================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );
                }
            });

        },
        {
            threshold: 0.1
        }
    );


function observePosts() {

    document.querySelectorAll(
        ".post-card"
    ).forEach(card => {

        if (
            card.dataset.observed === "true"
        ) {

            return;
        }


        card.dataset.observed =
            "true";


        card.style.opacity =
            "0";


        card.style.transform =
            "translateY(20px)";


        card.style.transition =
            "opacity 0.5s ease, transform 0.5s ease";


        observer.observe(card);
    });
}


observePosts();


/* =========================================================
   16. FILTRO POR CATEGORIA
   ========================================================= */

document.querySelectorAll(
    ".category-card"
).forEach(category => {

    category.addEventListener(
        "click",
        event => {

            event.preventDefault();


            const categoryName =
                category.querySelector(
                    "strong"
                )?.textContent
                .toLowerCase()
                .trim();


            if (!categoryName) {
                return;
            }


            const posts =
                document.querySelectorAll(
                    ".post-card"
                );


            let found = 0;


            posts.forEach(post => {

                const postCategory =
                    (
                        post.dataset.category ||
                        ""
                    ).toLowerCase();


                const match =
                    postCategory.includes(
                        categoryName
                    ) ||
                    categoryName.includes(
                        postCategory
                    );


                if (match) {

                    post.style.display =
                        "";

                    found++;

                } else {

                    post.style.display =
                        "none";
                }
            });


            const postsSection =
                document.querySelector(
                    "#posts"
                );


            if (postsSection) {

                postsSection.scrollIntoView({
                    behavior: "smooth"
                });
            }


            if (found > 0) {

                showNotification(
                    `${found} post(s) encontrado(s).`
                );

            } else {

                showNotification(
                    "Nenhum post nessa categoria."
                );
            }
        }
    );
});


/* =========================================================
   17. ESC PARA LIMPAR A BUSCA
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            searchInput
        ) {

            searchInput.value = "";


            const posts =
                document.querySelectorAll(
                    ".post-card"
                );


            posts.forEach(post => {

                post.style.display = "";
            });


            searchInput.blur();
        }
    }
);


/* =========================================================
   18. INFORMAÇÕES NO CONSOLE
   ========================================================= */

console.log(
    "%c TECHZONE ",
    `
        background: #6366f1;
        color: white;
        font-size: 20px;
        font-weight: bold;
        padding: 6px 12px;
        border-radius: 6px;
    `
);


console.log(
    "🚀 Blog carregado com sucesso!"
);


console.log(
    "💻 HTML + CSS + JavaScript"
);


/* =========================================================
   FIM DO SCRIPT
   ========================================================= */
