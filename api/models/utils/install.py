from models.utils.db import db

def install_models():
    db.create_all()

    db.engine.execute("CREATE INDEX IF NOT EXISTS idx_activity_objid ON activity(cast(changed_data->>'id' AS INT));")

    db.session.commit()
