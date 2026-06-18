#!/usr/bin/env python3
"""Export selected GTA VI source images into web-sized public assets.

This script intentionally uses macOS `sips` so the repo does not need a Python
imaging dependency just to regenerate static art. It expects the official image
pack in ./downloads and writes optimized JPEGs into ./public/art.
"""

from __future__ import annotations

import subprocess
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


@dataclass(frozen=True)
class Asset:
    source: str
    output: str
    width: int
    quality: int = 82


ASSETS: tuple[Asset, ...] = (
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Jason_and_Lucia_03/Jason_and_Lucia_03_ultrawide.jpg",
        "public/art/hero/hero-03-land.jpg",
        2560,
        84,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Jason_and_Lucia_03/Jason_and_Lucia_03_phone.jpg",
        "public/art/hero/hero-03-port.jpg",
        1200,
        84,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Official_Cover_Art/Official_Cover_Art_landscape.jpg",
        "public/art/og/cover.jpg",
        2400,
        84,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Jason_Lucia_Motel/Jason_and_Lucia_Motel_ultrawide.jpg",
        "public/art/divider/jason-lucia-motel.jpg",
        2560,
        83,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Jason_and_Lucia_03/Jason_and_Lucia_03_portrait.jpg",
        "public/art/cast/jason-lucia.jpg",
        1440,
        82,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Boobie_Ike/Boobie_Ike_portrait.jpg",
        "public/art/cast/boobie-ike.jpg",
        1440,
        82,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Raul_Bautista/Raul_Bautista_portrait.jpg",
        "public/art/cast/raul-bautista.jpg",
        1440,
        82,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Real_Dimez/Real_Dimez_portrait.jpg",
        "public/art/cast/real-dimez.jpg",
        1440,
        82,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/DreQuan_Priest/DreQuan_Priest_portrait.jpg",
        "public/art/cast/drequan-priest.jpg",
        1440,
        82,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Cal_Hampton/Cal_Hampton_portrait.jpg",
        "public/art/cast/cal-hampton.jpg",
        1440,
        82,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Brian_Heder/Brian_Heder_portrait.jpg",
        "public/art/cast/brian-heder.jpg",
        1440,
        82,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Jason_Lucia_Motel/Jason_and_Lucia_Motel_landscape.jpg",
        "public/art/cast-landscape/jason-lucia.jpg",
        2048,
        82,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Boobie_Ike/Boobie_Ike_landscape.jpg",
        "public/art/cast-landscape/boobie-ike.jpg",
        2048,
        82,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Raul_Bautista/Raul_Bautista_landscape.jpg",
        "public/art/cast-landscape/raul-bautista.jpg",
        2048,
        82,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Real_Dimez/Real_Dimez_landscape.jpg",
        "public/art/cast-landscape/real-dimez.jpg",
        2048,
        82,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/DreQuan_Priest/DreQuan_Priest_landscape.jpg",
        "public/art/cast-landscape/drequan-priest.jpg",
        2048,
        82,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Cal_Hampton/Cal_Hampton_landscape.jpg",
        "public/art/cast-landscape/cal-hampton.jpg",
        2048,
        82,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Brian_Heder/Brian_Heder_landscape.jpg",
        "public/art/cast-landscape/brian-heder.jpg",
        2048,
        82,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Postcards/Vice_City/Vice_City_Postcard_landscape.jpg",
        "public/art/postcards/vice-city.jpg",
        2048,
        80,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Postcards/Leonida_Keys/Leonida_Keys_Postcard_landscape.jpg",
        "public/art/postcards/leonida-keys.jpg",
        2048,
        80,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Postcards/Port_Gellhorn/Port_Gellhorn_Postcard_landscape.jpg",
        "public/art/postcards/port-gellhorn.jpg",
        2048,
        80,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Postcards/Mount_Kalaga_National_Park/Mount_Kalaga_National_Park_Postcard_landscape.jpg",
        "public/art/postcards/mount-kalaga.jpg",
        2048,
        80,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Postcards/Grassrivers/Grassrivers_Postcard_landscape.jpg",
        "public/art/postcards/grassrivers.jpg",
        2048,
        80,
    ),
    Asset(
        "downloads/GTAVI_Artwork_Wallpapers/Postcards/Ambrosia/Ambrosia_Postcard_landscape.jpg",
        "public/art/postcards/ambrosia.jpg",
        2048,
        80,
    ),
    Asset(
        "downloads/GTAVI_Screenshots/Places/Vice City/Vice_City_03.jpg",
        "public/art/scenes/vice-city.jpg",
        1920,
        78,
    ),
    Asset(
        "downloads/GTAVI_Screenshots/Places/Leonida Keys/Leonida_Keys_02.jpg",
        "public/art/scenes/leonida-keys.jpg",
        1920,
        78,
    ),
    Asset(
        "downloads/GTAVI_Screenshots/Places/Grassrivers/Grassrivers_04.jpg",
        "public/art/scenes/grassrivers.jpg",
        1920,
        78,
    ),
    Asset(
        "downloads/GTAVI_Screenshots/Places/Mount Kalaga National Park/Mount_Kalaga_National_Park_04.jpg",
        "public/art/scenes/mount-kalaga.jpg",
        1920,
        78,
    ),
    Asset(
        "downloads/GTAVI_Screenshots/Places/Port Gellhorn/Port_Gellhorn_04.jpg",
        "public/art/scenes/port-gellhorn.jpg",
        1920,
        78,
    ),
)


def run(asset: Asset) -> None:
    source = ROOT / asset.source
    output = ROOT / asset.output
    if not source.exists():
        raise FileNotFoundError(source)

    output.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            "sips",
            "--resampleWidth",
            str(asset.width),
            "--setProperty",
            "format",
            "jpeg",
            "--setProperty",
            "formatOptions",
            str(asset.quality),
            str(source),
            "--out",
            str(output),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
    )
    print(f"{asset.output} <= {asset.source}")


def main() -> None:
    for asset in ASSETS:
        run(asset)


if __name__ == "__main__":
    main()
