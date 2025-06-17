from django.db import migrations


def import_important_links(apps, schema_editor):
    Link = apps.get_model("resources", "Link")
    links = [
        {
            "title": "Faluche.app",
            "description": "Informations sur la faluche au global",
            "url": "https://faluche.app",
        },
        {
            "title": "Code amienois",
            "description": "Informations sur les copains au nord",
            "url": "https://code-amienois.app",
        },
        {
            "title": "Paillardes",
            "description": "Pour chanter bien mais mal",
            "url": "https://paillarde.app",
        },
    ]
    for link in links:
        Link.objects.create(
            name=link["title"],
            description=link.get("description", ""),
            url=link["url"],
            is_active=True,
        )


def reverse_func(apps, schema_editor):
    Link = apps.get_model("resources", "Link")
    Link.objects.filter(
        name__in=["Faluche.app", "Code amienois", "Paillardes"]
    ).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("resources", "0002_alter_link_created_at_alter_link_description_and_more"),
    ]

    operations = [
        migrations.RunPython(import_important_links, reverse_func),
    ]
