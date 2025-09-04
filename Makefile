PHONY: github

github:
				git add -A 
				git commit -m "update github pages"
				git push origin HEAD:svelte5