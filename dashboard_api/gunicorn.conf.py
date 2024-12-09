import multiprocessing
import os

from distutils.util import strtobool

bind = os.getenv(("WEB_BIND"), "0.0.0.0:5000")

workers = int(os.getenv("WEB_CONCURRENCY", multiprocessing.cpu_count() * 2))
threads = int(os.getenv("PYTHON_MAX_THREADS", 1))

reload = bool(strtobool(os.getenv("WEB_RELOAD", "false")))
