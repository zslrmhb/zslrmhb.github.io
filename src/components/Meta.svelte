<script>
	export let title = "Personal Website";
	export let description = "Personal Website of Hongbin Miao";
	export let url = "https://github.com/zslrmhb/zslrmhb.github.io";
	export let keywords =
		"Hongbin Miao, Hongbin, visual, interactive, visualization, tutorial, intuition, three.js, svelte, threlte, 3D, personal website";
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="Hongbin Miao" />
	<meta name="news_keywords" content={keywords} />
	<meta property="og:title" content={title} />
	<meta property="og:site_name" content="Hongbin Miao" />
	<meta property="og:url" content={url} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="article" />
	<meta property="og:locale" content="en_US" />
	<meta name="robots" content="max-image-preview:large" />
	<link rel="canonical" href="{url}/" />

	<script async src="https://www.googletagmanager.com/gtag/js?id=G-1BXPPS6M0S"></script>
  	<script>
    	    window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1BXPPS6M0S');
      </script>
</svelte:head>