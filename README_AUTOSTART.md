Auto-start / Auto-restart options

This project is a static site. To keep the local server running 24/7 and automatically restart it if it stops, pick one of the methods below and follow the steps on a machine or VPS you control.

1) systemd (recommended on Linux)
- Copy `deploy/launcher.service` to `/etc/systemd/system/launcher.service` and edit `WorkingDirectory` and `User` to match your environment.

Commands:
```bash
sudo cp deploy/launcher.service /etc/systemd/system/launcher.service
sudo systemctl daemon-reload
sudo systemctl enable --now launcher.service
sudo journalctl -u launcher.service -f
```

2) Watchdog script (no root required)
- Make the script executable and run it in background using `nohup`, `tmux`, or `screen`.

Commands:
```bash
chmod +x ./watchdog.sh
nohup ./watchdog.sh >/dev/null 2>&1 &
# or using tmux
tmux new -d -s launcher './watchdog.sh'
```

3) Docker / Docker Compose
- Run using `docker-compose` to keep the container restarting automatically.

Commands:
```bash
docker compose up -d
# check logs
docker compose logs -f
```

Notes:
- These approaches require a host that remains powered on (VPS, home server, or cloud VM). This repository's development containers or GitHub Codespaces are not permanent and cannot provide 24/7 uptime.
- If you prefer a fully managed static hosting solution (no server to manage), consider deploying to GitHub Pages, Netlify, or Vercel. I can add deployment workflows if you want.
