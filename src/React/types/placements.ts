export type placement = {
    placing: number,
    totalEntrants: number,
    tournamentName: string
}

export function getLastNPlacements(data: any, n: number) {
    let placements: placement[];

    console.log(data);

    const offlineSingles = data.player?.recentStandings.filter((standing: any) => {
        return !standing.container.isOnline && standing.container.type === 1;
    });

    placements = offlineSingles.map((standing: any) => {
        let name = standing.container.tournament.name;
        if (name === "Midlane Melee") {
            try{ 
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const [_1, _2, num] = standing.container.tournament.slug.split("-");
                name += " #" + num;
            } catch (err) {
                console.log("failed to extract midlane's number");
            } 
        }

        return {
            placing: standing.placement,
            totalEntrants: standing.container.numEntrants,
            tournamentName: name
        };
    });

    return placements.slice(0, Math.min(n, placements.length));
}