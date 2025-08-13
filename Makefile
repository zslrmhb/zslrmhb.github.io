PHONY: github

github:
				git add -A 
				git commit -m "update github pages"
				git pull
				rm -rf docs
				npm run build
				cp -r build docs
				touch docs/.nojekyll
				git push origin HEAD:svelte5