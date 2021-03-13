const Band = require('../Models/band');

class BandListener {

    constructor() {
        this.bands = [
            new Band('Greenday'),
            new Band('Zoé'),
            new Band('The Strokes'),
            new Band('Interpol'),
            new Band('Franz Ferdinand')
        ];
    }

    index = () => {
        return this.bands;
    }

    store = async ({ io, data }) => {
        const newBand = new Band(data.name);
        await this.bands.push(newBand);
        io.emit('init', this.bands);
    }

    destroy = (id) => {
        this.bands = this.bands.filter(band => band.id !== id);
    }

    increaseVotes = (id) => {
        this.bands = this.bands.map(band => {
            if (band.id === id) band.votes += 1;
            return band;
        })
    }

    changeName = (id, newName) => {
        this.bands = this.bands.map(band => {
            if (band.id === id) band.name = newName;
            return band;
        })
    }

}


module.exports = BandListener;