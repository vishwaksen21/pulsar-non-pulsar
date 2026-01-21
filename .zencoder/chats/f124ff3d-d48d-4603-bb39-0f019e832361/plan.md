# Localhost Migration Plan

This plan guides the migration of the Pulsar Detection website from PythonAnywhere to localhost.

## Phase 1: Investigation

### [x] Identify PythonAnywhere References
- [x] Search for "pythonanywhere" in the codebase to find API endpoints and hardcoded URLs.
- [x] Identify Django settings that might be specific to PythonAnywhere.
  - Checked `settings.py`: `DEBUG` is `False`, `ALLOWED_HOSTS` needs `localhost`, `SECRET_KEY` is a placeholder.

## Phase 2: Resolution

### [ ] Update Backend for Localhost
- [ ] Check `Backend/ISRO_Pulsar_Backend/settings.py` for `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, and other environment-specific settings.
- [ ] Ensure `db.sqlite3` is accessible and configured correctly for local use.
- [ ] Verify that necessary dependencies are installed or listed.

### [ ] Update Frontend for Localhost
- [ ] Replace `https://pulsardetection.pythonanywhere.com` with `http://127.0.0.1:8000` or `http://localhost:8000` in `ssd/both.js`.
- [ ] Replace `https://pulsardetection.pythonanywhere.com` with `http://127.0.0.1:8000` or `http://localhost:8000` in `ssd/num.js`.
- [ ] Replace `https://pulsardetection.pythonanywhere.com` with `http://127.0.0.1:8000` or `http://localhost:8000` in `ssd/img.js`.
- [ ] Replace `https://pulsardetection.pythonanywhere.com` with `http://127.0.0.1:8000` or `http://localhost:8000` in `ssd/format.js`.

## Phase 3: Verification

### [ ] Testing & Verification
- [ ] Run the Django server locally: `python manage.py runserver`.
- [ ] Open the frontend locally (e.g., using Live Server or just opening `index.html` in a browser).
- [ ] Verify each feature (CNN prediction, ANN prediction, Merged prediction, PHCX prediction) works with the local backend.

## Notes

- The frontend seems to be static files in the `ssd/` directory.
- The backend is a Django application in the `Backend/` directory.
