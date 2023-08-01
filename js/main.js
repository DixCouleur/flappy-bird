const __main = function() {
    // 自动生成调试面板
    const debugDiv = e('#id-debug-div')
    const keys = Object.keys(config)
    for(const k of keys) {
        const c = config[k]
        const html = templateControl(k, c)
        appendHtml(debugDiv, html)
    }

    bindEvents()

    const images = {
        sky: 'img/sky.png',
        ground: 'img/ground.png',
        bird1: 'img/bird-1.png',
        bird2: 'img/bird-2.png',
        bird3: 'img/bird-3.png',
        bird4: 'img/bird-4.png',
        pipe: 'img/pipe.png',
        scoreboard: 'img/scoreboard.png',
        title: 'img/title.png',
    }

    window.game = GuaGame.instance(60, images, function(g) {
        const s = new SceneMain(g)
        g.runWithScene(s)
        enableDebugMode(g, true)
    })
}

__main()